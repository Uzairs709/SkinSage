// pages/SignupScreen.tsx
import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import InfoField from "@/components/InfoField";
import PrimaryButton from "@/components/PrimaryButton";
import SecondaryLink from "@/components/SecondaryLink";
import LoginSignupHeader from "@/components/LoginSignupHeader";
import { Colors } from "@/constants/Colors";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import RoleSwitch from "@/components/RoleSwitch";
import { router } from "expo-router";
export default function signup() {
  const [selectedRole, setSelectedRole] = useState("Doctor");
  const [gender, setGender] = useState("Male");
  const [licenseNumber, setLicenseNumber] = useState("");

  const navigation = useNavigation();

  const handleSignup = () => {
    router.navigate("/(tabs)/doctor_dashboard")
  };

  const handleLogin = () => {
    router.navigate("/login")
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <LoginSignupHeader pagename={"Sign Up"} />
        {/* Role Switch */}
        <RoleSwitch
          selectedRole={selectedRole}
          onRoleChange={setSelectedRole}
        />
        {/* Use RoleSwitch */}
        {/* Input Fields */}
        <InfoField
          label="Name"
          value=""
          labelWidth={50}
          placeholder="Enter Name"
          editable={true}
        />
        <InfoField
          label="Email"
          value=""
          labelWidth={50}
          placeholder="Enter Email"
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
        {selectedRole === "Doctor" ? (
          <InfoField
            label="License No"
            value=""
            labelWidth={80}
            placeholder="Enter License No"
            editable={true}
          />
        ) : (
          <View style={styles.row}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Gender</Text>
              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={gender}
                  onValueChange={(itemValue) => setGender(itemValue)}
                  style={styles.picker}
                  dropdownIconColor={"#6B7280"} // Ensures arrow visibility
                >
                  <Picker.Item label="Select Gender" value="" />
                  <Picker.Item label="Male" value="Male" />
                  <Picker.Item label="Female" value="Female" />
                </Picker>
              </View>
            </View>

            <View style={styles.inputContainer}>
              <InfoField
                label="Age"
                value=""
                labelWidth={35}
                placeholder="Enter Age"
                editable={true}
              />
            </View>
          </View>
        )}
        {/* Signup Button */}
        <PrimaryButton label="Sign Up" onPress={handleSignup} />
        <Text style={styles.questionText}>Already have an account?</Text>
        <SecondaryLink text="Login" onPress={handleLogin} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingBottom: 20,
  },
  dropdownContainer: {
    flex: 1,
    marginRight: 10,
  },
  dropdownLabel: {
    fontSize: 14,
    color: Colors.light.primary,
    marginBottom: 5,
  },
  dropdown: {
    height: 50,
    borderWidth: 1,
    borderColor: Colors.light.primary,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  ageInput: {
    flex: 1,
    width: "100%", // Increased width for the age input box
  },
  questionText: {
    fontSize: 14,
    color: Colors.light.primary,
    textAlign: "center",
    marginVertical: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems:"center",
    marginHorizontal: 20,
    marginVertical: 10,
    width:"96%"
  },
  inputContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  label: {
    fontSize: 14,
    color: "#3D6734", // Matching the InfoField label color
    marginBottom: -8,
    marginLeft: 13,
    backgroundColor: "#fff",
    zIndex: 1,
    fontFamily: "Epilogue",
    fontWeight: "500",
  },
  pickerWrapper: {
    backgroundColor: "#fff",
    borderColor: "#D1D5DB",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    justifyContent: "center",
    height: 50, // Ensures proper height
  },
  picker: {
    height: 50,
    fontSize: 16,
    color: "#000",
  },
});

