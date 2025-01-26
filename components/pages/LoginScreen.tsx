import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";

const LoginScreen = () => {
  return (
    <ImageBackground
      source={require("../../assets/images/Green Arch background.svg")} // Ensure the correct image path
      style={styles.background}
    >
      {/* Centered Login text */}
      <Text style={styles.login}>Login</Text>

      <View style={styles.container}>
        <TextInput style={styles.input} placeholder="Email" />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
        />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.createAccountLink}>
            Don't have an account? Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "70%",
    marginTop: "-160px",
    justifyContent: "center",
    alignItems: "center",
  },
  // Center the "Login" text on the screen
  login: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#FFFFFF", // White text color
    top: "-20%", // Position the "Login" text in the upper part of the background
    marginTop: "400px",
    alignSelf: "center", // Center horizontally

    color: "#FFFFFF", // White text color
    marginBottom: 20, // Some space below the text
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "rgba(255, 255, 255, 0.8)", // Semi-transparent background for content
    padding: 20,
    // marginTop: "400px",
    borderRadius: 10,
    width: "80%",
  },

  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 12,
    borderRadius: 10,
    paddingLeft: 8,
    backgroundColor: "#fff", // White input background
  },
  button: {
    backgroundColor: "#3D6734",
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 40,
    marginBottom: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  createAccountLink: {
    color: "#3D6734",
    marginTop: 10,
    fontWeight: "bold",
  },
});

export default LoginScreen;
