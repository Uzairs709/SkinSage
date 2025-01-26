import { Header } from "@react-navigation/stack";
import { Stack } from "expo-router";

export default function RootLayout() {
  return  <Stack screenOptions={{headerShown: false}}/>;
}
