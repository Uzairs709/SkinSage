import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';

interface InfoFieldProps {
  label: string; // The label is a string
  value?: string; // The initial value is a string to be shown in the input field (optional)
  editable?: boolean; // editable is optional and defaults to false
  labelWidth?: number; // Optional label width
  isPassword?: boolean; // Whether the input is for a password
  placeholder?: string; // Placeholder text
}

const InfoField: React.FC<InfoFieldProps> = ({
  label = "",
  value ,
  editable = false,
  labelWidth = 80,
  isPassword = false,
  placeholder = ""
}) => {
  const [inputValue, setInputValue] = useState(value); // State to manage the input value

  let [fontsLoaded] = useFonts({
    'Epilogue': require('../assets/fonts/Epilogue-VariableFont_wght.ttf'), // Load your custom font
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>; // Show loading text while the font is being loaded
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { width: labelWidth }]}>{label}</Text>
      <TextInput
        style={styles.input}
        value={inputValue}
        editable={editable}
        onChangeText={setInputValue} // Update the state when the text changes
        placeholderTextColor="#6B7280" // Gray
        secureTextEntry={isPassword}
        placeholder={placeholder}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 14,
    color: '#3D6734', // Dark gray
    marginBottom: -8,
    marginLeft: 13,
    backgroundColor: '#fff',
    zIndex: 1,
    fontFamily: 'Epilogue',
    fontWeight: "500",
  },
  input: {
    backgroundColor: '#fff', // Light gray
    borderColor: '#D1D5DB', // Border gray
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
    color: '#000',
    zIndex: 0,
    fontFamily: 'Epilogue',
    paddingTop: 13,
  },
});

export default InfoField;
