import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack
  screenOptions={{
    headerShown:false
  }}
  >
    <Stack.Screen name="index" options={{title: "home"}} />
    <Stack.Screen name="splashscreen" options={{title: "splash"}} />
  </Stack> ;// Cambiar "stack" a "Stack"

}
