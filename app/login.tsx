import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
    Animated,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback
} from "react-native";
import Toast from "react-native-toast-message";
import { getAuthToken } from "../api";
import { useLogin } from "../api-hooks";

export default function LoginRoute() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const loginMutation = useLogin();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    const loadToken = async () => {
      const token = await getAuthToken();
      if (token) {
        router.replace({ pathname: "/products" } as any);
        return;
      }

      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 8,
          tension: 50,
          useNativeDriver: true,
        }),
      ]).start();
    };

    loadToken();
  }, [fadeAnim, router, scaleAnim]);

  const handleLogin = async () => {
    console.log("Login pressed", { username, password });

    if (!username.trim() || !password.trim()) {
      Toast.show({ type: "error", text1: "Enter credentials" });
      return;
    }

    setLoading(true);
    setErrorMessage(null);
    Toast.show({ type: "info", text1: "Logging in..." });

    try {
      const result = await loginMutation.mutateAsync({
        email: username.trim(),
        password,
      });
      console.log("Login result", result);

      if (result?.token) {
        Toast.show({ type: "success", text1: "Login successful" });
        router.replace({ pathname: "/products" } as any);
      } else {
        const message = result?.message || "Invalid login response";
        setErrorMessage(message);
        Toast.show({ type: "error", text1: message });
      }
    } catch (err: any) {
      console.error("Login error", err);
      const message =
        err?.response?.data?.message || err?.message || "Login failed";
      setErrorMessage(message);
      Toast.show({ type: "error", text1: message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardView}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 20}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Animated.View
          style={[
            styles.container,
            { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
          ]}
        >
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to continue</Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#bbb"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            editable={!loading}
          />
          <TextInput
            style={[styles.input, styles.inputLast]}
            placeholder="Password"
            placeholderTextColor="#bbb"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "Logging in..." : "Login"}
            </Text>
          </TouchableOpacity>
          {errorMessage ? (
            <Text style={styles.error}>{errorMessage}</Text>
          ) : null}
          <Text style={styles.hint}>
            Provide your real account credentials to access the production API.
          </Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    backgroundColor: "#050505",
  },
  title: {
    color: "#fff",
    fontSize: 34,
    fontWeight: "900",
    marginBottom: 12,
  },
  subtitle: {
    color: "#ccc",
    fontSize: 16,
    marginBottom: 28,
  },
  input: {
    width: "100%",
    backgroundColor: "#111",
    color: "#fff",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#222",
  },
  inputLast: {
    marginBottom: 20,
  },
  button: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 18,
  },
  buttonText: {
    color: "#000",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  keyboardView: {
    flex: 1,
    backgroundColor: "#050505",
  },
  hint: {
    color: "#777",
    fontSize: 12,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  error: {
    color: "tomato",
    marginBottom: 10,
    fontSize: 13,
    textAlign: "center",
  },
});
