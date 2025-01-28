import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import PrimaryButton from "../PrimaryButton"; // Import your PrimaryButton component

const SplashScreen: React.FC = () => {
  const navigation = useNavigation(); // Access the navigation object

  let [fontsLoaded] = useFonts({
    "Euphoria": require("../../assets/fonts/EuphoriaScript-Regular.ttf"), // Load your custom font
  });

  const handleGetStarted = () => {
    navigation.navigate("LoginScreen"); // Navigate to LoginScreen
  };

  if (!fontsLoaded) {
    return <Text>Loading...</Text>; // Show loading text while the font is being loaded
  }

  return (
    <View style={styles.container}>
      {/* Display the image */}
      <Image
        source={require("../../assets/images/skinsage.png")} // Path to the image file
        style={styles.logoImage} // Apply styles to the image
        resizeMode="contain" // Ensures the image fits without distortion
      />
      {/* Wrapper for tagline and button */}
      <View style={styles.bottomWrapper}>
        <Text style={styles.tagline}>Analyze, Uncover, Nurture!</Text>
        <PrimaryButton
          label="Get Started"
          onPress={handleGetStarted}
          width="80%" // Adjust button width as needed
        />
      </View>
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
  bottomWrapper: {
    position: "absolute", // Position the wrapper absolutely
    bottom: 40, // Distance from the bottom of the screen
    alignItems: "center", // Center tagline and button horizontally
    width: "100%", // Ensure the wrapper takes up the full width
  },
  tagline: {
    fontSize: 22, // Increased size for the tagline
    color: "#3D6734",
    textAlign: "center", // Center the tagline horizontally
    marginBottom: 10, // Space between tagline and button
  },
});

export default SplashScreen;
