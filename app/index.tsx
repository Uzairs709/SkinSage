import { Redirect } from "expo-router";

export default function Index() {
  const isLoggedIn = false; // Replace with real auth logic
  return <Redirect href={isLoggedIn ? "/(protected)/Doctor/(tabs)/doctor_dashboard" : "/(auth)/splash"} />;
}