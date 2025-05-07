import InfoField from "@/components/InfoField";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Feather"; // Using Feather icons for eye icons

interface PatientSignupProps {
  name: string;
  setName: (text: string) => void;
  email: string;
  setEmail: (text: string) => void;
  password: string;
  setPassword: (text: string) => void;
  gender: string;
  setGender: (value: string) => void;
  age: string;
  setAge: (text: string) => void;
}

const PatientSignup: React.FC<PatientSignupProps> = ({
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  gender,
  setGender,
  age,
  setAge,
}) => {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState(false);

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
  const toggleConfirmPasswordVisibility = () =>
    setConfirmPasswordVisible(!confirmPasswordVisible);

  const handleConfirmPasswordChange = (text: string) => {
    setConfirmPassword(text);
    if (text !== password) {
      setPasswordMatchError(true);
    } else {
      setPasswordMatchError(false);
    }
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
          isPassword={true}
          placeholder="Enter Password"
          editable
        />
        <TouchableOpacity
          onPress={togglePasswordVisibility}
          style={styles.eyeIcon}
        >
          <Icon
            name={passwordVisible ? "eye-off" : "eye"}
            size={24}
            color="#888"
            marginTop="20"
            marginRight="17"
          />
        </TouchableOpacity>
      </View>

      {/* Confirm Password Field */}
      <View style={styles.inputContainer}>
        <InfoField
          label="Confirm Password"
          value={confirmPassword}
          labelWidth={86}
          setValue={handleConfirmPasswordChange}
          isPassword={true}
          placeholder="Confirm Password"
          editable
        />
        <TouchableOpacity
          onPress={toggleConfirmPasswordVisibility}
          style={styles.eyeIcon}
        >
          <Icon
            name={confirmPasswordVisible ? "eye-off" : "eye"}
            size={24}
            color="#888"
            marginTop="35"
            marginRight="17"
          />
        </TouchableOpacity>
      </View>

      {/* Error message for password mismatch */}
      {passwordMatchError && (
        <Text style={styles.errorText}>Passwords do not match!</Text>
      )}

      <View style={styles.row}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Gender</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={gender}
              onValueChange={(value) => setGender(value)}
              style={styles.picker}
              dropdownIconColor={"#6B7280"}
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
            value={age}
            setValue={setAge}
            placeholder="Enter Age"
            editable
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 10,
    width: "96%",
  },
  inputContainer: {
    flex: 1,
    marginHorizontal: 5,
    // position: "relative",
  },
  label: {
    fontSize: 14,
    color: "#3D6734",
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
    height: 50,
  },
  picker: {
    height: 50,
    fontSize: 16,
    color: "#000",
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginLeft: 20,
    marginTop: 5,
  },
});

export default PatientSignup;
