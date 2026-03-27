import axios, { AxiosError } from "axios";
import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "PMS_AUTH_TOKEN";

const DEFAULT_API_BASE_URL =
  "https://product-management-backend-omega.vercel.app";
const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL ||
  process.env.API_BASE_URL ||
  DEFAULT_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15_000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

function debugLog(...args: any[]) {
  if (__DEV__) {
    // eslint-disable-next-line no-console
    console.log(...args);
  }
}

api.interceptors.request.use((config) => {
  debugLog("API Request:", {
    method: config.method,
    url: config.url,
    headers: config.headers,
    params: config.params,
    data: config.data,
  });
  return config;
});

api.interceptors.response.use(
  (response) => {
    debugLog("API Response:", {
      status: response.status,
      data: response.data,
      url: response.config.url,
    });
    return response;
  },
  async (error: AxiosError) => {
    debugLog("API Response Error:", {
      message: error.message,
      code: error.code,
      url: error.config?.url,
      response: error.response
        ? {
            status: error.response.status,
            data: error.response.data,
          }
        : undefined,
    });

    if (error.response?.status === 401) {
      await setAuthToken(null);
    }

    return Promise.reject(error);
  },
);

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
