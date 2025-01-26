import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import ProfileHeader from '@/components/ProfileHeader';
import InfoField from '@/components/InfoField';
import PrimaryButton from '@/components/PrimaryButton';

const Index = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <ProfileHeader />
        <InfoField label="Name" value="Muhammad Arslan Naseer" labelWidth={43} />
      <InfoField label="Email" value="arslannaseer1@gmail.com" labelWidth={40} />
      <InfoField label="Licence No" value="MP123456" labelWidth={80} />
        <PrimaryButton label="Back to Home" onPress={() => alert('Back to Home pressed')} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default Index;