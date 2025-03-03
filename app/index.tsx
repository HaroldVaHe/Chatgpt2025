import { useRouter } from "expo-router";
import { Button, View } from "react-native";

export default function Index() {
  const router=useRouter();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button
        title="Splash"
        onPress={() => router.push("/splashscreen")}
      />
        <Button
        title="Welcome"
        onPress={() => router.push("/welcome")}
      />
        <Button
        title="Dashboard"
        onPress={() => router.push("/dashboard")}
      />
        <Button
        title="Empty"
        onPress={() => router.push("/chatScreen")}
      />
    </View>
  );
}
