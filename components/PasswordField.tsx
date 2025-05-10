import Icon from '@expo/vector-icons/Feather';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import InfoField from './InfoField';

interface PasswordFieldProps {
  label: string;
  value: string;
  setValue: (text: string) => void;
  placeholder?: string;
  editable?: boolean;
  labelWidth?: number;
  showError?: boolean;
}

const PasswordField: React.FC<PasswordFieldProps> = ({
  label,
  value,
  setValue,
  placeholder = "Enter Password",
  editable = true,
  labelWidth = 80,
  showError = false,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const isPasswordTooShort = value.length > 0 && value.length < 6;

  const handlePasswordChange = (text: string) => {
    setValue(text);
  };

  return (
    <View style={styles.inputContainer}>
      <InfoField
        label={label}
        value={value}
        setValue={handlePasswordChange}
        placeholder={placeholder}
        editable={editable}
        labelWidth={labelWidth}
        isPassword={!isVisible}
        inputType="password"
      />
      <TouchableOpacity
        onPress={() => setIsVisible(!isVisible)}
        style={styles.eyeIcon}
      >
        <Icon
          name={isVisible ? "eye-off" : "eye"}
          size={24}
          color="#888"
          style={styles.icon}
        />
      </TouchableOpacity>
      {showError && isPasswordTooShort && (
        <Text style={styles.errorText}>Password must be at least 6 characters long</Text>
      )}
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
    top: 38,
    zIndex: 1,
  },
  icon: {
    marginTop: -9,
    marginRight: 13,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginLeft: 20,
    marginTop: 5,
  },
});

export default PasswordField; 