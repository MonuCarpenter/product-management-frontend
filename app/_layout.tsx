import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { SplashScreen } from "expo-router";
import { queryClient, secureStoragePersister } from "../queryClient";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "login",
};

SplashScreen.hide();

import { Slot } from "expo-router";

export default function AppLayout() {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: secureStoragePersister }}
    >
      <Slot />
    </PersistQueryClientProvider>
  );
}
