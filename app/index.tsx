import { useRouter } from "expo-router";
import { Button, View } from "react-native";

export default function Index() {
  const router = useRouter();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1e1e1e", // Fondo oscuro
      }}
    >
      <Button title="Splash" onPress={() => router.push("/splashscreen")} color="#18c37d" />
      <Button title="Welcome" onPress={() => router.push("/welcome")} color="#18c37d" />
      <Button title="Dashboard" onPress={() => router.push("/dashboard")} color="#18c37d" />
      <Button title="Empty" onPress={() => router.push("/chatScreen")} color="#18c37d" />
      <Button title="Login" onPress={() => router.push("/login")} color="#18c37d" />
    </View>
  );
}
