import { AuthContext } from "../context/authContext/AuthContext";
import { useContext } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";

export default function Login() {
      const {handleLogin, email, setEmail, password, setPassword, error} = useContext(AuthContext);
  

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

      <Button title="Login" onPress={handleLogin} color="#18c37d" />
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
