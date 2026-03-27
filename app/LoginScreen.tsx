import { useNavigation } from "@react-navigation/native";

import { useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import Toast from "react-native-toast-message";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleLogin = () => {
    // TODO: Replace with real API call
    if (username && password) {
      Toast.show({ type: "success", text1: "Login successful" });
      navigation.navigate("Products");
    } else {
      Toast.show({ type: "error", text1: "Enter credentials" });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#888"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={[styles.input, styles.inputLast]}
        placeholder="Password"
        placeholderTextColor="#888"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  title: {
    color: "#fff",
    fontSize: 30,
    marginBottom: 32,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    width: 256,
    marginBottom: 16,
  },
  inputLast: {
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
