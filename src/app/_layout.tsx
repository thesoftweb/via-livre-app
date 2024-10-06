import {
  Sora_100Thin,
  Sora_400Regular,
  Sora_700Bold,
  Sora_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/sora";

import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Sora_100Thin,
    Sora_400Regular,
    Sora_700Bold,
    Sora_800ExtraBold,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);
  if (!loaded && !error) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="auth/login" />
      <Stack.Screen name="home" />
      <Stack.Screen name="index" />
      <Stack.Screen name="vehicles/create" />
      <Stack.Screen name="vehicles/view" />
    </Stack>
  );
}
