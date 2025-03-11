import { auth } from "@/utils/FirebaseConfig";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = async () => {
    try {
      setError(""); // Resetear error antes del intento de login
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log({ response: response.user });
      if (response.user) {
        router.push("/chatScreen");
      }
    } catch (error: any) {
      console.log("Error Login: ", error.message);
      setError("Correo o contraseña incorrectos"); // Mensaje de error amigable
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <Button title="Login" onPress={login} color="#18c37d" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1e1e1e",
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: "white",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    backgroundColor: "#2C2C3A",
    color: "white",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});
