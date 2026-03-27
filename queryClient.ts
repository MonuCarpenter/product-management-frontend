import type {
    PersistedClient,
    Persister,
} from "@tanstack/query-persist-client-core";
import { QueryClient } from "@tanstack/react-query";
import * as SecureStore from "expo-secure-store";

const PERSIST_KEY = "REACT_QUERY_CACHE";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 300000,
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      retry: 3,
      retryOnMount: false,
      gcTime: 300000,
      networkMode: "offlineFirst",
    },
  },
});

const secureStoragePersister: Persister = {
  persistClient: async (persistedClient: PersistedClient) => {
    try {
      await SecureStore.setItemAsync(
        PERSIST_KEY,
        JSON.stringify(persistedClient),
      );
    } catch (error) {
      console.warn("Failed to persist query cache to SecureStore", error);
    }
  },
  restoreClient: async () => {
    try {
      const cache = await SecureStore.getItemAsync(PERSIST_KEY);
      if (!cache) {
        return undefined;
      }
      return JSON.parse(cache) as PersistedClient;
    } catch (error) {
      console.warn("Failed to restore query cache from SecureStore", error);
      return undefined;
    }
  },
  removeClient: async () => {
    try {
      await SecureStore.deleteItemAsync(PERSIST_KEY);
    } catch (error) {
      console.warn("Failed to remove query cache from SecureStore", error);
    }
  },
};

export { queryClient, secureStoragePersister };
