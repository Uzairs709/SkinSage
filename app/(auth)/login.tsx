// pages/LoginPage.tsx
import React from "react";
import {
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import InfoField from "@/components/InfoField";
import PrimaryButton from "@/components/PrimaryButton";
import SecondaryLink from "@/components/SecondaryLink";
import LoginSignupHeader from "@/components/LoginSignupHeader";
import { Colors } from "@/constants/Colors";
import { useFonts } from "expo-font";

import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";

export default function LoginScreen (){
  //   const navigation = useNavigation<NavigationProp<any>>(); // `any` type for simpler use case

  const navigation = useNavigation();

 
  let [fontsLoaded] = useFonts({
    Epilogue: require("../../assets/fonts/Epilogue-VariableFont_wght.ttf"), // Load your custom font
  });
  if(!fontsLoaded){
    return<></>
  }
  const handleSignUp = () => {
    router.navigate("/signup")
  };

  const handleLogin = () =>{
    router.navigate("/(tabs)/doctor_dashboard")
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <LoginSignupHeader pagename={"Login"} />
        <InfoField
          label="Email"
          value=""
          labelWidth={40}
          placeholder="Enter email"
          editable={true}
        />
        <InfoField
          label="Password"
          value=""
          labelWidth={80}
          isPassword={true}
          placeholder="Enter Password"
          editable={true}
        />
        <PrimaryButton label="Login" onPress={handleLogin} />
        <Text style={styles.questionText}> Don't have an account?</Text>
        <SecondaryLink text=" Sign Up" onPress={handleSignUp} />
      </ScrollView>
    </SafeAreaView>
  );
};

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

