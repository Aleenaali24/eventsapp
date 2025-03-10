import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { getCurrentUser, signOut } from "../../lib/supabase_crud";

export default function HomeScreen() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const loggedInUser = await getCurrentUser();
        if (!loggedInUser) {
          console.log("No user session found. Redirecting to login.");
          router.replace("/(auth)/login");
        } else {
          setUser(loggedInUser);
          console.log("User authenticated:", loggedInUser);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        Alert.alert("Authentication Error", error instanceof Error ? error.message : "An unknown error occurred.");
        router.replace("/(auth)/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#FFA500" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {user?.email}!</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={async () => {
          await signOut();
          router.replace("/(auth)/login");
        }}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#000" },
  title: { fontSize: 24, color: "#FFA500", marginBottom: 20 },
  button: { backgroundColor: "#FFA500", padding: 10, borderRadius: 8 },
  buttonText: { color: "#000", fontSize: 16, fontWeight: "bold" },
});