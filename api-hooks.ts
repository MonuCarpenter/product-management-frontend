import { useMutation, useQuery } from "@tanstack/react-query";
import api, { setAuthToken } from "./api";

// --- Auth ---
export function useLogin() {
  return useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      try {
        const { data } = await api.post("/api/auth/login", { email, password });
        if (data?.token) {
          await setAuthToken(data.token);
        }
        return data;
      } catch (error: any) {
        const status = error?.response?.status;
        const message =
          error?.response?.data?.error ||
          error?.response?.data?.message ||
          error?.message ||
          "Login failed";

        throw {
          status,
          message,
        };
      }
    },
  });
}

export function useRegisterSalesman() {
  return useMutation({
    mutationFn: async (payload: {
      name: string;
      email: string;
      phone: string;
      password: string;
    }) => {
      const { data } = await api.post("/api/auth/register", payload);
      return data;
    },
  });
}

// --- Users ---
export function useCurrentUser() {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const { data } = await api.get("/api/user/me");
      return data;
    },
    staleTime: 0,
  });
}

export function useUsers(params: { page?: number; limit?: number }) {
  return useQuery({
    queryKey: ["users", params],
    queryFn: async () => {
      const { data } = await api.get("/api/users", { params });
      return data;
    },
    staleTime: 0,
  });
}

export function useUser(id: string) {
  return useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      const { data } = await api.get(`/api/users/${id}`);
      return data;
    },
    staleTime: 0,
  });
}

export function useDeleteUser() {
  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await api.delete(`/api/users/${id}`);
      return data;
    },
  });
}

// --- Products ---
export function useProducts(
  params: { page?: number; limit?: number },
  options?: { enabled?: boolean },
) {
  return useQuery<any[]>({
    queryKey: ["products", params],
    queryFn: async () => {
      const { data } = await api.get("/api/products", { params });
      return data;
    },
    staleTime: 0,
    enabled: options?.enabled ?? true,
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data } = await api.get(`/api/products/${id}`);
      return data;
    },
    staleTime: 0,
  });
}

export function useCreateProduct() {
  return useMutation({
    mutationFn: async (payload: any) => {
      const { data } = await api.post("/api/products", payload);
      return data;
    },
  });
}

export function useBulkCreateProducts() {
  return useMutation({
    mutationFn: async (payload: any[]) => {
      const { data } = await api.post("/api/products/bulk", payload);
      return data;
    },
  });
}

// --- Changes ---
export function useChanges() {
  return useQuery({
    queryKey: ["changes"],
    queryFn: async () => {
      const { data } = await api.get("/api/changes");
      return data;
    },
    staleTime: 0,
  });
}

export function useChange(id: string) {
  return useQuery({
    queryKey: ["change", id],
    queryFn: async () => {
      const { data } = await api.get(`/api/changes/${id}`);
      return data;
    },
    staleTime: 0,
  });
}
