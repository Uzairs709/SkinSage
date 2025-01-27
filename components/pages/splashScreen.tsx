import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import PrimaryButton from "../PrimaryButton"; // Import your PrimaryButton component

const SplashScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Display the image */}
      <Image
        source={require("../../assets/images/skinsage.png")} // Path to the image file
        style={styles.logoImage} // Apply styles to the image
        resizeMode="contain" // Ensures the image fits without distortion
      />
      {/* Tagline */}
      <Text style={styles.tagline}>Analyze, Uncover, Nurture!</Text>
      {/* Primary Button */}

      <PrimaryButton
        label="Get Started"
        style={styles.btn} // Apply styles to the image
        onPress={() => alert("Login pressed")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  logoImage: {
    width: 320, // Adjust the size of the image as needed
    height: 320,
    marginBottom: 20,
  },
  tagline: {
    fontSize: 22, // Increased size for the tagline
    color: "#3D6734",
    textAlign: "center", // Center the tagline horizontally
    marginBottom: -15, // Space between tagline and button
  },
});

export default SplashScreen;
