import { Header } from "@react-navigation/stack";
import { Stack } from "expo-router";

export default function RootLayout() {
  return  (
    <Stack screenOptions={{headerShown: false}}>
    {/* Authentication Screens */}
    <Stack.Screen name="(auth)/splash" options={{ headerShown: false }} />
    <Stack.Screen name="(auth)/login" options={{ headerShown:false }} />
    <Stack.Screen name="(auth)/signup" options={{ headerShown:false }} />

    {/* Main App Screens */}
    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    <Stack.Screen name="/resultsScreen" options={{ headerShown: false }} /> {/*result app*/}
  </Stack>
  );
}
