import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../lib/supabase_crud";
import { ActivityIndicator, View } from "react-native";

export default function RootLayout() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await getCurrentUser();
        if (user) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        setIsAuthenticated(false);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  // ✅ Show Loading Spinner while checking authentication
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#FFA500" />
      </View>
    );
  }

  return (
    <Stack>
      {/* ✅ Splash Screen (Only Show Initially) */}
      <Stack.Screen name="splash" options={{ headerShown: false }} />

      {/* ✅ Show Auth Screens if User is NOT Logged In */}
      {!isAuthenticated && (
        <>
          <Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)/register" options={{ headerShown: false }} />
        </>
      )}

      {/* ✅ Show Main Screens if User is Logged In */}
      {isAuthenticated && (
        <>
          <Stack.Screen name="(tabs)/landing" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)/events" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)/profile" options={{ headerShown: false }} />
        </>
      )}
    </Stack>
  );
}
