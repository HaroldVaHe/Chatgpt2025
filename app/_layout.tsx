import { ChatProvider } from "@/context/chatContext/ChatContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return <ChatProvider> 
    <Stack
  screenOptions={{
    headerShown:false
  }}
  >
    <Stack.Screen name="index" options={{title: "home"}} />
    <Stack.Screen name="splashscreen" options={{title: "splash"}} />
    <Stack.Screen name="chatScreen" options={{title: "chatScreen"}} />
    <Stack.Screen name="dashboard" options={{title: "dashboard"}} />
  </Stack> 
  </ChatProvider>
  ;// Cambiar "stack" a "Stack"

}
