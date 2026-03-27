import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { getAuthToken, setAuthToken } from "../api";
import { useProducts } from "../api-hooks";

export default function ProductsRoute() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkToken = async () => {
      const token = await getAuthToken();
      if (!token) {
        setAuthenticated(false);
        return;
      }
      setAuthenticated(true);
    };
    checkToken();
  }, []);

  if (authenticated === false) {
    return <Redirect href="/login" />;
  }

  if (authenticated === null) {
    return (
      <View style={styles.center}>
        <Text style={styles.loading}>Checking session...</Text>
      </View>
    );
  }

  const {
    data = [] as any[],
    isLoading,
    error,
  } = useProducts({ page: 1, limit: 50 });

  if (isLoading) {
    return (
      <View style={styles.center}>
        <Text style={styles.loading}>Loading products...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Failed to load products</Text>
      </View>
    );
  }

  const logout = async () => {
    await setAuthToken(null);
    setAuthenticated(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Products</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id?.toString() ?? String(Math.random())}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <Text style={styles.productName}>
              {item.product_name ?? item.name ?? "Unnamed product"}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 16,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 12,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  loading: { color: "#fff" },
  error: { color: "tomato" },
  productCard: {
    backgroundColor: "#111",
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
  },
  productName: {
    color: "#fff",
    fontSize: 16,
  },
});
