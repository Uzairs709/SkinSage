import InfoField from "@/components/InfoField";
import PasswordField from "@/components/PasswordField";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

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
  errorText: {
    color: "red",
    fontSize: 14,
    marginLeft: 20,
    marginTop: 5,
  },
});

export default PatientSignup;
