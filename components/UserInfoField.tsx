import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

type Props = {
  label: string;
  value: string;
};

const UserInfoField: React.FC<Props> = ({ label, value }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={styles.input} value={value} editable={false} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2E4D30',
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#F3F4F6',
    padding: 10,
    borderRadius: 10,
    fontSize: 16,
  },
});

export default UserInfoField;
