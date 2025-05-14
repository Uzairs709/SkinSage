import InfoField from '@/components/InfoField';
import ProfileHeader from '@/components/ProfileHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text } from 'react-native';

interface User {
  name: string;
  email: string;
  license_number?: string;
  doc_designation?: string;
  doc_specialization?: string;
}

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        }
      } catch (error) {
        console.error('Failed to load user from storage:', error);
      }
    };

    loadUser();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <ProfileHeader name={user?.name || ''} profession={'Dermatologist'} />
        {user ? (
          <>
            <InfoField label="Name" value={user.name} labelWidth={43} />
            <InfoField label="Email" value={user.email} labelWidth={40} />
            <InfoField
              label="Licence No"
              value={user.license_number || 'N/A'}
              labelWidth={80}
            />
            <InfoField label="Designation" value={user.doc_designation || 'N/A'} labelWidth={83} />
            <InfoField label="Specialization" value={user.doc_specialization || 'N/A'} labelWidth={99} />
          </>
        ) : (
          <Text style={styles.loading}>Loading profile...</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 100,
  },
  loading: {
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Profile;
