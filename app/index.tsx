import React from "react";
import { View } from "react-native";
import SplashScreen from "@/components/pages/splashScreen"; // Ensure this path is correct

const Index: React.FC = () => {
  return (
    <View style={{ flex: 1 }}>
      <SplashScreen />
    </View>
  );
};

export default Index;
