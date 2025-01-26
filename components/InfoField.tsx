// components/InfoField.tsx
import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';

interface InfoFieldProps {
  label: string; // The label is a string
  value: string; // The value is a string to be shown in the input field
  editable?: boolean; // editable is optional and defaults to false
}

const InfoField = ({ label, value, editable = false, labelWidth = 80 }) => {
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
        value={value}
        editable={editable}
        placeholderTextColor="#6B7280" // Gray
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
    fontWeight: 500,

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
