import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

const LoginScreen: React.FC = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ImageBackground
        source={require("../../assets/images/Green-Arc.png")} // Use a compatible image format
        style={styles.background}
      >
        <Text style={styles.login}>Login</Text>

        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#888"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#888"
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
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  login: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 20,
    textAlign: "center",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    width: "80%",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 10,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 12,
    borderRadius: 10,
    paddingLeft: 8,
    backgroundColor: "#fff",
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
