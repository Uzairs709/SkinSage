// components/SecondaryLink.tsx
import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { useFonts } from "expo-font";

interface SecondaryLinkProps {
  text: string;
  onPress: () => void;
}

const SecondaryLink: React.FC<SecondaryLinkProps> = ({ text, onPress }) => {
  let [fontsLoaded] = useFonts({
    Epilogue: require("../assets/fonts/Epilogue-VariableFont_wght.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.linkText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  linkText: {
    fontSize: 20,
    color: "#3D6734",
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "Epilogue",
  },
});

export default SecondaryLink;
