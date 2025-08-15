import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../../global.css";
import NetworkStatus from "../components/NetworkStatus";
import { useAppFocusManager } from "../lib/focusManager";
import { setupNetworkStatus } from "../lib/networkManager";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
});

// Set the animation options. This is optional.
SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

// Setup network status monitoring
setupNetworkStatus();

export default function RootLayout() {
  const isLoggedIn = false;

  const [loaded] = useFonts({
    PoppinsLight: require("../../assets/fonts/Poppins-Light.ttf"),
    PoppinsRegular: require("../../assets/fonts/Poppins-Regular.ttf"),
    PoppinsMedium: require("../../assets/fonts/Poppins-Medium.ttf"),
    PoppinsBold: require("../../assets/fonts/Poppins-Bold.ttf"),
    PoppinsSemiBold: require("../../assets/fonts/Poppins-SemiBold.ttf"),
    PlusJakartaSansLight: require("../../assets/fonts/PlusJakartaSans-Light.ttf"),
    PlusJakartaSansMedium: require("../../assets/fonts/PlusJakartaSans-Medium.ttf"),
    PlusJakartaSansRegular: require("../../assets/fonts/PlusJakartaSans-Regular.ttf"),
    PlusJakartaSansSemiBold: require("../../assets/fonts/PlusJakartaSans-SemiBold.ttf"),
  });

  // Setup app focus management
  useAppFocusManager();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hide();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <NetworkStatus />
            <Stack>
              <Stack.Protected guard={isLoggedIn}>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              </Stack.Protected>
              <Stack.Protected guard={!isLoggedIn}>
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
              </Stack.Protected>
            </Stack>
            <StatusBar style="auto" />
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </QueryClientProvider>
    </>
  );
}
