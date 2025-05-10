// components/PrimaryButton.tsx
import { useFonts } from 'expo-font';
import React from 'react';
import { DimensionValue, StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';

interface PrimaryButtonProps {
  label: string; // The label is a string
  onPress: () => void; // onPress is a function that takes no arguments and returns nothing
  width?: DimensionValue; // Optional width for the button (can be a percentage or a number in pixels)
  style?: StyleProp<ViewStyle>; // Custom styles for the button container
  textStyle?: StyleProp<TextStyle>; // Custom styles for the button text
  disabled?: boolean;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ label, onPress, width, style, textStyle, disabled }) => {
  let [fontsLoaded] = useFonts({
    'Epilogue': require('../assets/fonts/Epilogue-VariableFont_wght.ttf'), // Load your custom font
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>; // Show loading text while the font is being loaded
  }

  return (
    <TouchableOpacity 
      style={[
        styles.button, 
        width ? { width } : {}, 
        disabled && styles.disabledButton,
        style
      ]} 
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.buttonText, textStyle]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#3D6734', // Green color
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 40,
    marginBottom: 20,
  },
  disabledButton: {
    backgroundColor: '#CCCCCC',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'Epilogue',
  },
});

export default PrimaryButton;
