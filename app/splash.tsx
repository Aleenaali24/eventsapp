import { useEffect, useRef } from "react";
import { View, Text, Animated, StyleSheet, Easing } from "react-native";
import { useRouter, useRootNavigationState } from "expo-router";

export default function SplashScreen() {
  const router = useRouter();
  const navigationState = useRootNavigationState(); // Ensure router is mounted
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!navigationState?.key) return; // 🚀 Wait until router is ready

    Animated.timing(rotateAnim, {
      toValue: 1,
      duration: 1500,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    const navigateToLogin = setTimeout(() => {
      router.replace("/(auth)/login"); // ✅ Navigate only when ready
    }, 2500);

    return () => clearTimeout(navigateToLogin);
  }, [navigationState?.key]);

  return (
    <View style={styles.container}>
      <Animated.Text
        style={[
          styles.title,
          {
            transform: [
              {
                rotate: rotateAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["0deg", "360deg"],
                }),
              },
            ],
            opacity: fadeAnim,
          },
        ]}
      >
        Instant Connect
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FFA500",
  },
});