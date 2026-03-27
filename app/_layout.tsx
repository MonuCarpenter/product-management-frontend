import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { Slot, SplashScreen } from "expo-router";
import { queryClient, secureStoragePersister } from "../queryClient";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from "expo-router";

export const unstable_settings = {
  // Ensure root starts at index and not old tabs layout.
  initialRouteName: "index",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

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
