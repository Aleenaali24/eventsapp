import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      {/* Start at Splash Screen */}
      <Stack.Screen name="splash" options={{ headerShown: false }} />
      
      {/* Authentication Screens */}
      <Stack.Screen name="auth/login" options={{ headerShown: false }} />
      <Stack.Screen name="auth/register" options={{ headerShown: false }} />

      {/* Main Home Screen After Login */}
      <Stack.Screen name="(tabs)/index" options={{ headerShown: false }} />
    </Stack>
  );
}
