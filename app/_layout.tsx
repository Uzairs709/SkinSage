import { Header } from "@react-navigation/stack";
import { Stack } from "expo-router";
import { Colors } from "@/constants/Colors";
export default function RootLayout() {
  return  <Stack screenOptions={{headerShown: false, headerTintColor:Colors.light.primary}}/>;
}
