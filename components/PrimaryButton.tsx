// components/PrimaryButton.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, StyleProp, TextStyle, ViewStyle } from 'react-native';
import { useFonts } from 'expo-font';

interface PrimaryButtonProps {
  label: string; // The label is a string
  onPress: () => void; // onPress is a function that takes no arguments and returns nothing
  width?: string | number; // Optional width for the button (can be a percentage or a number in pixels)
  style?: StyleProp<ViewStyle>; // Custom styles for the button container
  textStyle?: StyleProp<TextStyle>; // Custom styles for the button text
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ label, onPress, width, style, textStyle }) => {
  let [fontsLoaded] = useFonts({
    'Epilogue': require('../assets/fonts/Epilogue-VariableFont_wght.ttf'), // Load your custom font
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>; // Show loading text while the font is being loaded
  }

  return (
    <TouchableOpacity 
      style={[styles.button, { width: width || 'auto' }, style]} 
      onPress={onPress}
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
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'Epilogue',
  },
});

export default PrimaryButton;
