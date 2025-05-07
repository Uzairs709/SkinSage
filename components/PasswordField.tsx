import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import InfoField from './InfoField';

interface PasswordFieldProps {
  label: string;
  value: string;
  setValue: (text: string) => void;
  placeholder?: string;
  editable?: boolean;
  labelWidth?: number;
}

const PasswordField: React.FC<PasswordFieldProps> = ({
  label,
  value,
  setValue,
  placeholder = "Enter Password",
  editable = true,
  labelWidth = 80,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <View style={styles.inputContainer}>
      <InfoField
        label={label}
        value={value}
        setValue={setValue}
        placeholder={placeholder}
        editable={editable}
        labelWidth={labelWidth}
        isPassword={!isVisible}
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
});

export default PasswordField; 