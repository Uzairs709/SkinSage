import InfoField from "@/components/InfoField";
import PasswordField from "@/components/PasswordField";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

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

      <PasswordField
        label="Password"
        value={password}
        setValue={setPassword}
        placeholder="Enter Password"
      />

      <PasswordField
        label="Confirm Password"
        value={confirmPassword}
        setValue={handleConfirmPasswordChange}
        placeholder="Confirm Password"
        labelWidth={150}
      />

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
  errorText: {
    color: "red",
    fontSize: 14,
    marginLeft: 20,
    marginBottom: 10,
  },
});

export default DoctorSignup;
