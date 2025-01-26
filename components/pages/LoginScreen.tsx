// pages/LoginPage.tsx
import React from "react";
import { View, Text, StyleSheet, ImageBackground,SafeAreaView,ScrollView } from "react-native";
import InfoField from "../../components/InfoField";
import PrimaryButton from "../../components/PrimaryButton";
import SecondaryLink from "../../components/SecondaryLink";
import LoginSignupHeader from "../LoginSignupHeader";

const LoginScreen: React.FC = () => {
  const handleLogin = () => {
    // Add login functionality
    console.log("Login Pressed");
  };

  const handleSignUp = () => {
    // Navigate to Sign-Up Page
    console.log("Sign-Up Pressed");
  };
return(
  
 <SafeAreaView style={styles.container}>
       <ScrollView>
         <LoginSignupHeader pagename={"Login"} />
       <InfoField label="Email" value="" labelWidth={40} placeholder="Enter email" editable={true}/>
       <InfoField label="Password" value="" labelWidth={80} isPassword={true} placeholder="Enter Password" editable={true} />
         <PrimaryButton label="Login" onPress={() => alert('Login pressed')} />
          <SecondaryLink text="Don't have an account? Sign Up" onPress={handleSignUp}/>
       </ScrollView>
    </SafeAreaView>
  
)
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
  });

export default LoginScreen;
