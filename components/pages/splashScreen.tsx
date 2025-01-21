import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const SplashScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.logoText}>SkinSage</Text>
      <Text style={styles.tagline}>Analyze, Uncover, Nurture!</Text>
      <TouchableOpacity style={styles.button}>
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
  },
  logoText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#2E7D32",
    fontFamily: "serif",
    marginBottom: 20,
  },
  tagline: {
    fontSize: 16,
    color: "#2E7D32",
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#2E7D32",
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 40,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default SplashScreen;
