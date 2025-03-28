import React from "react";
import { View } from "react-native";
import InfoField from "@/components/InfoField";

interface DoctorSignupProps {
  name: string;
  setName: (text: string) => void;
  email: string;
  setEmail: (text: string) => void;
  password: string;
  setPassword: (text: string) => void;
  licenseNumber: string;
  setLicenseNumber: (text: string) => void;
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
}) => {
  return (
    <View>
      <InfoField
        label="Name"
        value={name}
        onChangeText={setName}
        placeholder="Enter Name"
        editable
      />
      <InfoField
        label="Email"
        value={email}
        onChangeText={setEmail}
        placeholder="Enter Email"
        editable
      />
      <InfoField
        label="Password"
        value={password}
        onChangeText={setPassword}
        isPassword
        placeholder="Enter Password"
        editable
      />
      <InfoField
        label="License No"
        value={licenseNumber}
        onChangeText={setLicenseNumber}
        placeholder="Enter License No"
        editable
      />
    </View>
  );
};

export default DoctorSignup;
