// app/index.tsx
import { useContext, useEffect, useState } from "react";
import { Redirect } from "expo-router";
import { AuthContext } from "@/context/AuthContext";

export default function Index() {
  const { user, loading } = useContext(AuthContext);
  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        setInitialRoute("/(auth)/splash");
      } else if (user.user_type === "doctor") {
        setInitialRoute("/(protected)/Doctor/(tabs)/doctor_dashboard");
      } else if (user.user_type === "patient") {
        console.log("Patient triggered");
        setInitialRoute("/(auth)/splash"); // or replace with patient route
      }
    }
  }, [loading, user]);

  // While loading or determining route, stay on root
  if (loading || !initialRoute) {
    return <Redirect href="/(auth)/splash" />;
  }

  return <Redirect href={initialRoute} />;
}
