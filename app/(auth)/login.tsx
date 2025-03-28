import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";
import InfoField from "@/components/InfoField";
import PrimaryButton from "@/components/PrimaryButton";
import SecondaryLink from "@/components/SecondaryLink";
import LoginSignupHeader from "@/components/LoginSignupHeader";
import { Colors } from "@/constants/Colors";
import { useFonts } from "expo-font";
import axios from "@/utils/api"; // Import axios instance
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let [fontsLoaded] = useFonts({
    Epilogue: require("../../assets/fonts/Epilogue-VariableFont_wght.ttf"),
  });

  if (!fontsLoaded) {
    return <></>;
  }

  const handleSignUp = () => {
    router.navigate("/signup");
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("/token", { email, password });

      if (response.data.access_token) {
        await AsyncStorage.setItem("access_token", response.data.access_token);
        router.navigate("/(tabs)/doctor_dashboard");
      }
    } catch (error:any) {
      if (!error.response) {
        Alert.alert("Error", "No internet connection");
      } else if (error.response.status === 401) {
        Alert.alert("Error", "Invalid credentials");
      } else {
        Alert.alert("Error", "Something went wrong. Please try again.");
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
        />
        <InfoField
          label="Password"
          value={password}
          labelWidth={80}
          isPassword={true}
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
