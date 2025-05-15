import { useFonts } from 'expo-font';
import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

type InputType = 'text' | 'email' | 'password' | 'number';

interface InfoFieldProps {
  label: string;
  value?: string;
  editable?: boolean;
  labelWidth?: number;
  placeholder?: string;
  setValue?: (value: string) => void;
  isPassword?: boolean;
  inputType?: InputType;
}

const InfoField: React.FC<InfoFieldProps> = ({
  label = "",
  value,
  editable = false,
  labelWidth = 80,
  placeholder = "",
  setValue,
  isPassword = false,
  inputType = 'text',
}) => {
  let [fontsLoaded] = useFonts({
    'Epilogue': require('../assets/fonts/Epilogue-VariableFont_wght.ttf'),
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  const handleChangeText = (text: string) => {
    if (setValue) {
      if (inputType === 'number') {
        // Only allow numbers
        const numericValue = text.replace(/[^0-9]/g, '');
        setValue(numericValue);
      } else if (inputType === 'email') {
        // Allow email format
        setValue(text);
      } else {
        // Default text input
        setValue(text);
      }
    }
  };

  const getKeyboardType = () => {
    switch (inputType) {
      case 'number':
        return 'numeric';
      case 'email':
        return 'email-address';
      default:
        return 'default';
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { width: labelWidth }]}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        editable={editable}
        onChangeText={handleChangeText}
        placeholderTextColor="#6B7280"
        placeholder={placeholder}
        autoCapitalize="none"
        secureTextEntry={isPassword && inputType === 'password'}
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
    color: '#3D6734',
    marginBottom: -8,
    marginLeft: 13,
    backgroundColor: '#fff',
    zIndex: 1,
    fontFamily: 'Epilogue',
    fontWeight: "500",
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#D1D5DB',
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
