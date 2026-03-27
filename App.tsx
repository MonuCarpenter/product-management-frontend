import { NavigationContainer } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RootNavigator from "./app/index";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <RootNavigator />
        <Toast />
      </NavigationContainer>
    </QueryClientProvider>
  );
}
