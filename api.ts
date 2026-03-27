import axios from "axios";
import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "PMS_AUTH_TOKEN";
const api = axios.create({
  baseURL: "", // Set your API base URL here
});

export async function setAuthToken(token: string | null) {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    await SecureStore.setItemAsync(TOKEN_KEY, token);
  } else {
    delete api.defaults.headers.common["Authorization"];
    await SecureStore.deleteItemAsync(TOKEN_KEY);
  }
}

export async function getAuthToken() {
  const token = await SecureStore.getItemAsync(TOKEN_KEY);
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  return token;
}

export default api;
