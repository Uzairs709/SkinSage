import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import PrimaryButton from "@/components/PrimaryButton";
import SecondaryLink from "@/components/SecondaryLink";
import LoginSignupHeader from "@/components/LoginSignupHeader";
import { router } from "expo-router";
import RoleSwitch from "@/components/RoleSwitch";
import DoctorSignup from "@/components/DoctorSignup";
import PatientSignup from "@/components/PatientSignup";

export default function signup() {
  const [selectedRole, setSelectedRole] = useState("Doctor");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [gender, setGender] = useState("Male");
  const [age, setAge] = useState("");

  const handleSignup = () => {
    router.push("/(tabs)/doctor_dashboard");
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

        <PrimaryButton label="Sign Up" onPress={handleSignup} />
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
