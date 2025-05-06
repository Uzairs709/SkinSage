// app/index.tsx
import { AuthContext } from "@/context/AuthContext";
import { Redirect } from "expo-router";
import { useContext, useEffect, useState } from "react";

type RoutePath = "/(auth)/login" | "/(doctor)/(tabs)/doctor_dashboard" | "/(patient)/(tabs)/home";

const Index = () => {
  const { user, loading } = useContext(AuthContext);
  const [initialRoute, setInitialRoute] = useState<RoutePath | null>(null);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        // If no user is logged in, redirect to auth screens
        setInitialRoute("/(auth)/login");
      } else if (user.user_type === "doctor") {
        // Redirect to doctor's dashboard
        setInitialRoute("/(doctor)/(tabs)/doctor_dashboard");
      } else if (user.user_type === "patient") {
        // Redirect to patient's dashboard
        setInitialRoute("/(patient)/(tabs)/home");
      }
    }
  }, [loading, user]);

  // While loading or determining route, stay on root
  if (loading || !initialRoute) {
    return null; // Or a loading screen
  }

  return <Redirect href={initialRoute as any} />;
};

export default Index;
