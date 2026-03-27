import { useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { useQuery } from "react-query";

// Dummy data for now
const PRODUCTS = [
  { id: "1", name: "Product A" },
  { id: "2", name: "Product B" },
  { id: "3", name: "Product C" },
];

function fetchProducts(search: string) {
  // Replace with real API call
  return PRODUCTS.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );
}

export default function ProductsScreen() {
  const [search, setSearch] = useState("");
  const { data: products = [] } = useQuery(["products", search], () =>
    fetchProducts(search),
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Products</Text>
      <TextInput
        style={styles.input}
        placeholder="Search products..."
        placeholderTextColor="#888"
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <Text style={styles.productName}>{item.name}</Text>
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
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    marginBottom: 16,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 16,
  },
  productCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
  },
  productName: {
    color: "#000",
    fontSize: 18,
  },
});
