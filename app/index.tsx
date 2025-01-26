import React, { useEffect, useState } from "react";
import { View } from "react-native";
import SplashScreen from "@/components/pages/splashScreen"; // Ensure this path is correct
import LoginScreen from "@/components/pages/LoginScreen"; // Ensure this path is correct

const Index: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false); // After 3 seconds, hide the splash screen
    }, 3000);

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {showSplash ? <SplashScreen /> : <LoginScreen />}
    </View>
  );
};

export default Index;
