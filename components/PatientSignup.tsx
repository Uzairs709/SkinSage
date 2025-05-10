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
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
    gender: false,
    age: false,
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

      <View style={styles.row}>
        <View style={styles.inputContainer}>
          {errors.gender && <Text style={styles.requiredLabel}>Gender *</Text>}
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={gender}
              onValueChange={(value) => {
                setGender(value);
                validateField("gender", value);
              }}
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
          {errors.age && <Text style={styles.requiredLabel}>Age *</Text>}
          <InfoField
            label="Age"
            value={age}
            setValue={(text) => {
              setAge(text);
              validateField("age", text);
            }}
            placeholder="Enter Age"
            editable
            inputType="number"
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
