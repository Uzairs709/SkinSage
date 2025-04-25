import React, { useState, useContext } from "react";
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
import { router } from "expo-router";
import { AuthContext } from "@/context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
    router.navigate("/signup");
  };

  const handleLogin = async () => {
    try {
      await login(email, password);
      // After login, the AuthContext is updated.
      // Read user info from AsyncStorage (or from context) and navigate accordingly.
      // Here, since the login call sets the context, you can use that immediately.
      // (For production you might want to await state update or re-read the stored user.)
      // For demonstration, we assume the context is updated synchronously.
      // You could also use an effect to listen to auth state changes.
      // For now, we’ll use a simple conditional:
      const userString = await AsyncStorage.getItem("user");
      if (userString) {
        const user = JSON.parse(userString);
        if (user.user_type === "doctor") {
          router.replace("/(protected)/Doctor/(tabs)/doctor_dashboard");
        } else {
          // router.navigate("(protected)/Doctor//(tabs)/patient_dashboard");
          console.log("Patient here");

        }
      }
    } catch (error: any) {
      if (!error.response) {
        Alert.alert("Error", "No internet connection" + error);
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
