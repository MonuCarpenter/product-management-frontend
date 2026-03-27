import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { SplashScreen } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { queryClient, secureStoragePersister } from "../queryClient";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "login",
};

SplashScreen.hide();

import { Slot } from "expo-router";

export default function AppLayout() {
  return (
    <SafeAreaProvider>
      <SafeAreaView
        edges={["top", "left", "right"]}
        style={{ flex: 1, backgroundColor: "#000" }}
      >
        <PersistQueryClientProvider
          client={queryClient}
          persistOptions={{ persister: secureStoragePersister }}
        >
          <Slot />
        </PersistQueryClientProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
