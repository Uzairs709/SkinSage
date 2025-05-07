import InfoField from "@/components/InfoField";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Feather"; // Eye icon

interface DoctorSignupProps {
  name: string;
  setName: (text: string) => void;
  email: string;
  setEmail: (text: string) => void;
  password: string;
  setPassword: (text: string) => void;
  licenseNumber: string;
  setLicenseNumber: (text: string) => void;
  designation: string;
  setDesignation: (text: string) => void;
  specialization: string;
  setSpecialization: (text: string) => void;
}

const DoctorSignup: React.FC<DoctorSignupProps> = ({
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  licenseNumber,
  setLicenseNumber,
  designation,
  setDesignation,
  specialization,
  setSpecialization,
}) => {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState(false);

  const handleConfirmPasswordChange = (text: string) => {
    setConfirmPassword(text);
    setPasswordMatchError(text !== password);
  };

  return (
    <View>
      <InfoField
        label="Name"
        value={name}
        setValue={setName}
        placeholder="Enter Name"
        editable
      />
      <InfoField
        label="Email"
        value={email}
        setValue={setEmail}
        placeholder="Enter Email"
        editable
      />

      {/* Password Field */}
      <View style={styles.inputContainer}>
        <InfoField
          label="Password"
          value={password}
          setValue={setPassword}
          isPassword
          placeholder="Enter Password"
          editable
        />
        <TouchableOpacity
          onPress={() => setPasswordVisible(!passwordVisible)}
          style={styles.eyeIcon}
        >
          <Icon
            name={passwordVisible ? "eye-off" : "eye"}
            size={24}
            color="#888"
            marginTop="-9"
            marginRight="13"
          />
        </TouchableOpacity>
      </View>

      {/* Confirm Password Field */}
      <View style={styles.inputContainer}>
        <InfoField
          label="Confirm Password"
          value={confirmPassword}
          setValue={handleConfirmPasswordChange}
          isPassword
          placeholder="Confirm Password"
          editable
        />
        <TouchableOpacity
          onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
          style={styles.eyeIcon}
        >
          <Icon
            name={confirmPasswordVisible ? "eye-off" : "eye"}
            size={24}
            color="#888"
            marginTop="6"
            marginRight="13"
          />
        </TouchableOpacity>
      </View>

      {/* Error Message */}
      {passwordMatchError && (
        <Text style={styles.errorText}>Passwords do not match!</Text>
      )}

      <InfoField
        label="License No"
        value={licenseNumber}
        setValue={setLicenseNumber}
        placeholder="Enter License No"
        editable
      />
      <InfoField
        label="Designation"
        value={designation}
        setValue={setDesignation}
        labelWidth={83}
        placeholder="e.g. Dermatologiest/Skin Specialist"
        editable
      />
      <InfoField
        label="Specialization"
        value={specialization}
        labelWidth={99}
        setValue={setSpecialization}
        placeholder="e.g. MBBS, FCPS, Diploma"
        editable
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    position: "relative",
    marginBottom: 10,
  },
  eyeIcon: {
    position: "absolute",
    right: 15,
    top: 38, // Adjust this based on your InfoField height
    zIndex: 1,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginLeft: 20,
    marginBottom: 10,
  },
});

export default DoctorSignup;
