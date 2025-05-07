import { useFonts } from 'expo-font';
import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

interface InfoFieldProps {
  label: string;
  value?: string;
  editable?: boolean;
  labelWidth?: number;
  placeholder?: string;
  setValue?: (value: string) => void;
  isPassword?: boolean;
}

const InfoField: React.FC<InfoFieldProps> = ({
  label = "",
  value,
  editable = false,
  labelWidth = 80,
  placeholder = "",
  setValue,
  isPassword = false,
}) => {
  let [fontsLoaded] = useFonts({
    'Epilogue': require('../assets/fonts/Epilogue-VariableFont_wght.ttf'),
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { width: labelWidth }]}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        editable={editable}
        onChangeText={setValue}
        placeholderTextColor="#6B7280"
        placeholder={placeholder}
        autoCapitalize="none"
        secureTextEntry={isPassword}
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
