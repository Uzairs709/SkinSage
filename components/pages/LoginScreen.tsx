// pages/LoginPage.tsx
import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import InputField from "../../components/InputField";
import PrimaryButton from "../../components/PrimaryButton";
import SecondaryLink from "../../components/SecondaryLink";

const LoginScreen: React.FC = () => {
  const handleLogin = () => {
    // Add login functionality
    console.log("Login Pressed");
  };

  const handleSignUp = () => {
    // Navigate to Sign-Up Page
    console.log("Sign-Up Pressed");
  };

  return (
    <ImageBackground
      source={require("../../assets/images/Green-Arc.png")} // Path to your background image
      style={styles.headerContainer}
      imageStyle={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>

        <InputField placeholder="Email" />
        <InputField placeholder="Password" secureTextEntry />
        <PrimaryButton label="Login" onPress={handleLogin} />
        <SecondaryLink
          text="Don't have an account? Sign Up"
          onPress={handleSignUp}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    flex: 1, // Ensures the image fills the header container
    width: "100%", // Ensures the image covers the full width of the container
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#FFF",
    fontFamily: "Epilogue",
    position: "relative", // Absolute position to place the title in the center of the screen
    bottom: "80%", // Adjust to center vertically on the screen

    textAlign: "center",
  },
  container: {
    width: "90%",
    // backgroundColor: "rgba(255, 255, 255, 0.9)", // Semi-transparent background
    padding: 20,
    borderRadius: 12,
    marginTop: "70%",
    alignItems: "center",
  },
  headerContainer: {
    height: 400,
    flex: 1, // Ensures the container takes up the full available space
    justifyContent: "center", // Centers the content vertically
    alignItems: "center", // Centers the content horizontally
    paddingVertical: 20, // Adds padding to the top and bottom
    overflow: "hidden", // Ensures the content stays within the rounded corners
  },

  primaryButton: {
    paddingVertical: 15, // Increase the vertical padding for bigger button
    paddingHorizontal: 25, // Increase horizontal padding for bigger button
    fontSize: 18, // Increase font size
  },
});

export default LoginScreen;
