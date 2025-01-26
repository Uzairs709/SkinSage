// components/InputField.tsx
import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { useFonts } from "expo-font";

interface InputFieldProps {
  placeholder: string;
  secureTextEntry?: boolean; // For password field
}

const InputField: React.FC<InputFieldProps> = ({
  placeholder,
  secureTextEntry = false,
}) => {
  let [fontsLoaded] = useFonts({
    Epilogue: require("../assets/fonts/Epilogue-VariableFont_wght.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#6B7280" // Gray color
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  input: {
    backgroundColor: "#FFF",
    borderColor: "#D1D5DB",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    width: 300, // Fixed width of the input field

    fontFamily: "Epilogue",
  },
});

export default InputField;
