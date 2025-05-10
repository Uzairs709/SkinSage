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
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
    licenseNumber: false,
    designation: false,
    specialization: false,
  });

  const handleConfirmPasswordChange = (text: string) => {
    setConfirmPassword(text);
    setPasswordMatchError(text !== password);
    setErrors(prev => ({ ...prev, confirmPassword: text === "" }));
  };

  const validateField = (field: string, value: string) => {
    setErrors(prev => ({ ...prev, [field]: value.trim() === "" }));
  };

  return (
    <View>
      <View style={styles.fieldContainer}>
        {errors.name && <Text style={styles.requiredLabel}>Name *</Text>}
        <InfoField
          label="Name"
          value={name}
          setValue={(text) => {
            setName(text);
            validateField("name", text);
          }}
          placeholder="Enter Name"
          editable
        />
      </View>

      <View style={styles.fieldContainer}>
        {errors.email && <Text style={styles.requiredLabel}>Email *</Text>}
        <InfoField
          label="Email"
          value={email}
          setValue={(text) => {
            setEmail(text);
            validateField("email", text);
          }}
          placeholder="Enter Email"
          editable
          inputType="email"
        />
      </View>

      <View style={styles.fieldContainer}>
        {errors.password && <Text style={styles.requiredLabel}>Password *</Text>}
        <PasswordField
          label="Password"
          value={password}
          setValue={(text) => {
            setPassword(text);
            validateField("password", text);
          }}
          placeholder="Enter Password"
          showError={true}
        />
      </View>

      <View style={styles.fieldContainer}>
        {errors.confirmPassword && <Text style={styles.requiredLabel}>Confirm Password *</Text>}
        <PasswordField
          label="Confirm Password"
          value={confirmPassword}
          setValue={handleConfirmPasswordChange}
          placeholder="Confirm Password"
          labelWidth={150}
          showError={true}
        />
      </View>

      {passwordMatchError && (
        <Text style={styles.errorText}>Passwords do not match!</Text>
      )}

      <View style={styles.fieldContainer}>
        {errors.licenseNumber && <Text style={styles.requiredLabel}>License No *</Text>}
        <InfoField
          label="License No"
          value={licenseNumber}
          setValue={(text) => {
            setLicenseNumber(text);
            validateField("licenseNumber", text);
          }}
          placeholder="Enter License No"
          editable
        />
      </View>

      <View style={styles.fieldContainer}>
        {errors.designation && <Text style={styles.requiredLabel}>Designation *</Text>}
        <InfoField
          label="Designation"
          value={designation}
          setValue={(text) => {
            setDesignation(text);
            validateField("designation", text);
          }}
          labelWidth={83}
          placeholder="e.g. Dermatologiest/Skin Specialist"
          editable
        />
      </View>

      <View style={styles.fieldContainer}>
        {errors.specialization && <Text style={styles.requiredLabel}>Specialization *</Text>}
        <InfoField
          label="Specialization"
          value={specialization}
          labelWidth={99}
          setValue={(text) => {
            setSpecialization(text);
            validateField("specialization", text);
          }}
          placeholder="e.g. MBBS, FCPS, Diploma"
          editable
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fieldContainer: {
    marginBottom: 5,
  },
  requiredLabel: {
    fontSize: 14,
    color: "red",
    marginLeft: 20,
    marginBottom: 5,
    fontFamily: "Epilogue",
    fontWeight: "500",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginLeft: 20,
    marginTop: 5,
  },
});

export default DoctorSignup;
