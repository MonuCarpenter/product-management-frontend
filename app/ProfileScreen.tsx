import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

// Dummy user data
const USER = {
  name: "John Doe",
  role: "admin", // or 'user'
};

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.info}>Name: {USER.name}</Text>
      <Text style={[styles.info, styles.infoLast]}>Role: {USER.role}</Text>
      {/* Add more profile details and actions here */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 24,
    marginBottom: 16,
    fontWeight: "bold",
  },
  info: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 8,
  },
  infoLast: {
    marginBottom: 24,
  },
  button: {
    backgroundColor: "#fff",
    paddingHorizontal: 32,
    paddingVertical: 8,
    borderRadius: 8,
  },
  buttonText: {
    color: "#000",
    fontWeight: "600",
  },
});
