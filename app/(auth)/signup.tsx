import CheckoutForm from "@/components/checkout-form.native";
import DoctorSignup from "@/components/DoctorSignup";
import LoginSignupHeader from "@/components/LoginSignupHeader";
import PatientSignup from "@/components/PatientSignup";
import PrimaryButton from "@/components/PrimaryButton";
import RoleSwitch from "@/components/RoleSwitch";
import SecondaryLink from "@/components/SecondaryLink";
import api from "@/utils/api"; // Adjust the path to your axios instance file
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text } from "react-native";


export default function Signup() {
  const [selectedRole, setSelectedRole] = useState("Doctor");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [gender, setGender] = useState("Male");
  const [age, setAge] = useState("");
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);


 
  const handleSignup = async () => {
    let payload = {};

    if (selectedRole === "Doctor") {
      payload = {
        name,
        email,
        password,
        user_type: "doctor",
        license_number: licenseNumber,
      };
    } else {
      payload = {
        name,
        email,
        password,
        user_type: "patient",
        age: age ? parseInt(age) : undefined,
        gender,
      };
    }

    try {
      const response = await api.post("/signup", payload);
      console.log("Signup successful", response.data);

      // Redirect based on role
      if (selectedRole === "Doctor") {
        // router.push("/(tabs)/doctor_dashboard");
      } else if (selectedRole === "Patient") {
        //TODO: update this
        // router.push("/(tabs)/home");
      } else {
        Alert.alert("some error occured")
      }
    } catch (error: any) {
      console.error(
        "Signup failed",
        error.response ? error.response.data : error.message
      );
      Alert.alert("Signup Failed", "Please try again.");
    }
  };

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <LoginSignupHeader pagename={"Sign Up"} />

        <RoleSwitch
          selectedRole={selectedRole}
          onRoleChange={setSelectedRole}
        />

        {selectedRole === "Doctor" ? (
          <DoctorSignup
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            licenseNumber={licenseNumber}
            setLicenseNumber={setLicenseNumber}
          />
        ) : (
          <PatientSignup
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            gender={gender}
            setGender={setGender}
            age={age}
            setAge={setAge}
          />
        )}

        <CheckoutForm amount={300} />

        <PrimaryButton
          label="Sign Up"
          onPress={handleSignup}
          
        />
        <Text style={styles.questionText}>Already have an account?</Text>
        <SecondaryLink text="Login" onPress={handleLogin} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingBottom: 20,
  },
  questionText: {
    fontSize: 14,
    color: "#3D6734",
    textAlign: "center",
    marginVertical: 10,
  },
});
