import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
const SplashScreen: React.FC = () => {
  const navigation = useNavigation(); // Access the navigation object

   let [fontsLoaded] = useFonts({
      'Euphoria': require('../../assets/fonts/EuphoriaScript-Regular.ttf'), // Load your custom font
    });
  

  const handleGetStarted = () => {
    navigation.navigate("LoginScreen"); // Navigate to LoginScreen
  };
 if (!fontsLoaded) {
    return <Text>Loading...</Text>; // Show loading text while the font is being loaded
  }

  return (
    <View style={styles.container}>
      <Text style={styles.logoText}>SkinSage</Text>
      <Text style={styles.tagline}>Analyze, Uncover, Nurture!</Text>
      <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
        <Text style={styles.buttonText}>Get started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20, // Optional for better alignment on smaller screens
  },
  logoText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#3D6734",
    fontFamily: "Euphoria",
    marginBottom: 20,
  },
  tagline: {
    fontSize: 16,
    color: "#3D6734",
    marginBottom: 40,
  },
  button: {
    position: "absolute", // Position the button absolutely
    bottom: 40, // Distance from the bottom of the screen
    width: "90%", // Button width covers 80% of the screen
    backgroundColor: "#3D6734",
    borderRadius: 25,
    paddingVertical: 15,
    alignSelf: "center", // Center the button horizontally
    shadowColor: "#000", // Optional shadow for better appearance
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5, // Shadow for Android
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center", // Center the text inside the button
  },
});

export default SplashScreen;
