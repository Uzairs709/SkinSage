import InfoField from "@/components/InfoField";
import LoginSignupHeader from "@/components/LoginSignupHeader";
import PasswordField from "@/components/PasswordField";
import PrimaryButton from "@/components/PrimaryButton";
import SecondaryLink from "@/components/SecondaryLink";
import { Colors } from "@/constants/Colors";
import { AuthContext } from "@/context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";
import { router } from "expo-router";
import React, { useContext, useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);

  let [fontsLoaded] = useFonts({
    Epilogue: require("../../assets/fonts/Epilogue-VariableFont_wght.ttf"),
  });

  if (!fontsLoaded) {
    return <></>;
  }

  const handleSignUp = () => {
    router.replace("/signup");
  };

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        Alert.alert("Error", "Please enter both email and password");
        return;
      }

      await login(email, password);
      const userString = await AsyncStorage.getItem("user");
      
      if (userString) {
        const user = JSON.parse(userString);
        
        if (!user.user_type) {
          console.error("User type is missing from user data");
          Alert.alert("Error", "Invalid user data received");
          return;
        }

        if (user.user_type === "doctor") {
          router.replace("/(doctor)/(tabs)/doctor_dashboard");
        } else if (user.user_type === "patient") {
          router.replace("/(patient)/(tabs)/home");
        } else {
          console.error("Invalid user type:", user.user_type);
          Alert.alert("Error", "Invalid user type");
        }
      } else {
        console.error("No user data found in storage");
        Alert.alert("Error", "Failed to retrieve user data");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      if (error.message.includes("User profile not found")) {
        Alert.alert("Error", "Unable to retrieve user profile. Please try logging in again.");
      } else {
        Alert.alert("Error", error.message || "An unexpected error occurred");
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <LoginSignupHeader pagename={"Login"} />
        <InfoField
          label="Email"
          value={email}
          labelWidth={40}
          placeholder="Enter email"
          editable={true}
          setValue={setEmail}
          inputType="email"
        />
        <PasswordField
          label="Password"
          value={password}
          labelWidth={80}
          placeholder="Enter Password"
          editable={true}
          setValue={setPassword}
        />
        <PrimaryButton label="Login" onPress={handleLogin} />
        <Text style={styles.questionText}> Don't have an account?</Text>
        <SecondaryLink text=" Sign Up" onPress={handleSignUp} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  questionText: {
    fontSize: 14,
    color: Colors.light.primary,
    textAlign: "center",
    fontFamily: "Epilogue",
  },
});
