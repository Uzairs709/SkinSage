import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import UserInfoField from '@/components/UserInfoField';
import BackToHomeButton from '@/components/BackToHomeButton';
import UserProfileHeader from '@/components/UserProfileHeader';

export default function App() {
  return (
    <View style={styles.container}>
      <UserProfileHeader
              name="M Khizar Imran"
              role="Patient" image={undefined}      />
      <View style={styles.infoContainer}>
        <UserInfoField label="Name" value="Mohammad Khizar Imran" />
        <UserInfoField label="Email" value="sheikhmkhizar@gmail.com" />
        <View style={styles.row}>
          <UserInfoField label="Gender" value="Male" />
          <UserInfoField label="Age" value="22 years" />
        </View>
        <BackToHomeButton onPress={() => Alert.alert('Returning to Home Screen')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  infoContainer: {
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

