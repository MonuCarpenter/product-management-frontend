import { MaterialIcons } from "@expo/vector-icons";
import { Redirect, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getAuthToken, setAuthToken } from "../api";
import { useCurrentUser, useProducts } from "../api-hooks";

export default function ProductsRoute() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const { data: user } = useCurrentUser();

  useEffect(() => {
    const checkToken = async () => {
      const token = await getAuthToken();
      setAuthenticated(!!token);
    };
    checkToken();
  }, []);

  interface Product {
    id?: string | number;
    product_name?: string;
    name?: string;
  }

  const {
    data = [] as Product[],
    isLoading,
    error,
  } = useProducts({ page: 1, limit: 50 }, { enabled: authenticated === true });

  useEffect(() => {
    if (error && (error as any)?.response?.status === 401) {
      setAuthToken(null).then(() => {
        router.replace({ pathname: "/login" } as any);
      });
    }
  }, [error, router]);

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

  if (isLoading) {
    return (
      <View style={styles.center}>
        <Text style={styles.loading}>Loading products...</Text>
      </View>
    );
  }

  if (error) {
    const status = (error as any)?.response?.status;

    if (status === 401) {
      return (
        <View style={styles.center}>
          <Text style={styles.error}>
            Session expired, redirecting to login...
          </Text>
        </View>
      );
    }

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
      <View style={styles.headerRow}>
        <Text style={styles.title}>Products</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {/* Filter, Search, Grid/List icons */}
          <TouchableOpacity style={styles.iconButton}>
            <MaterialIcons name="filter-list" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialIcons name="search" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialIcons name="grid-view" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialIcons name="view-list" size={24} color="#fff" />
          </TouchableOpacity>
          {/* User icon */}
          <TouchableOpacity
            style={styles.userIconButton}
            onPress={() => setMenuVisible((v) => !v)}
          >
            <MaterialIcons name="account-circle" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      {/* User menu */}
      {menuVisible && (
        <View style={styles.menu}>
          <Text style={styles.menuUserName}>
            {user?.name || user?.email || "User"}
          </Text>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              setMenuVisible(false);
              router.push("/profile");
            }}
          >
            <Text style={styles.menuItemText}>My Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={async () => {
              setMenuVisible(false);
              await setAuthToken(null);
              router.replace({ pathname: "/login" } as any);
            }}
          >
            <Text style={styles.menuItemText}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}
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
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
    zIndex: 2,
  },
  iconButton: {
    marginHorizontal: 4,
    padding: 4,
  },
  userIconButton: {
    marginLeft: 8,
    padding: 2,
    borderRadius: 15,
    backgroundColor: "#222",
  },
  menu: {
    position: "absolute",
    top: 60,
    right: 16,
    backgroundColor: "#222",
    borderRadius: 10,
    padding: 12,
    zIndex: 10,
    minWidth: 160,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  menuUserName: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  },
  menuItem: {
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 6,
  },
  menuItemText: {
    color: "#fff",
    fontSize: 15,
    textAlign: "center",
  },
  logoutButton: {
    backgroundColor: "#222",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
    marginLeft: 10,
  },
  logoutText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});
