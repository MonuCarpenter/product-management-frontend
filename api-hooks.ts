import { useMutation, useQuery } from "react-query";
import api, { setAuthToken } from "./api";

// --- Auth ---
export function useLogin() {
  return useMutation(
    async ({ email, password }: { email: string; password: string }) => {
      const { data } = await api.post("/api/auth/login", { email, password });
      setAuthToken(data.token);
      return data;
    },
    { cacheTime: 0 },
  );
}

export function useRegisterSalesman() {
  return useMutation(
    async (payload: {
      name: string;
      email: string;
      phone: string;
      password: string;
    }) => {
      const { data } = await api.post("/api/auth/register", payload);
      return data;
    },
    { cacheTime: 0 },
  );
}

// --- Users ---
export function useCurrentUser() {
  return useQuery(
    "currentUser",
    async () => {
      const { data } = await api.get("/api/user/me");
      return data;
    },
    { cacheTime: 0 },
  );
}

export function useUsers(params: { page?: number; limit?: number }) {
  return useQuery(
    ["users", params],
    async () => {
      const { data } = await api.get("/api/users", { params });
      return data;
    },
    { cacheTime: 0 },
  );
}

export function useUser(id: string) {
  return useQuery(
    ["user", id],
    async () => {
      const { data } = await api.get(`/api/users/${id}`);
      return data;
    },
    { cacheTime: 0 },
  );
}

export function useDeleteUser() {
  return useMutation(
    async (id: string) => {
      const { data } = await api.delete(`/api/users/${id}`);
      return data;
    },
    { cacheTime: 0 },
  );
}

// --- Products ---
export function useProducts(params: { page?: number; limit?: number }) {
  return useQuery(
    ["products", params],
    async () => {
      const { data } = await api.get("/api/products", { params });
      return data;
    },
    { cacheTime: 0 },
  );
}

export function useProduct(id: string) {
  return useQuery(
    ["product", id],
    async () => {
      const { data } = await api.get(`/api/products/${id}`);
      return data;
    },
    { cacheTime: 0 },
  );
}

export function useCreateProduct() {
  return useMutation(
    async (payload: any) => {
      const { data } = await api.post("/api/products", payload);
      return data;
    },
    { cacheTime: 0 },
  );
}

export function useBulkCreateProducts() {
  return useMutation(
    async (payload: any[]) => {
      const { data } = await api.post("/api/products/bulk", payload);
      return data;
    },
    { cacheTime: 0 },
  );
}

// --- Changes ---
export function useChanges() {
  return useQuery(
    "changes",
    async () => {
      const { data } = await api.get("/api/changes");
      return data;
    },
    { cacheTime: 0 },
  );
}

export function useChange(id: string) {
  return useQuery(
    ["change", id],
    async () => {
      const { data } = await api.get(`/api/changes/${id}`);
      return data;
    },
    { cacheTime: 0 },
  );
}
