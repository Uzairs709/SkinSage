
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import SplashScreen from "@/components/pages/splashScreen"; // Ensure this path is correct
import LoginScreen from "@/components/pages/LoginScreen"; // Ensure this path is correct

const Index: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false); // After 3 seconds, hide the splash screen
    }, 3000);

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {showSplash ? <SplashScreen /> : <LoginScreen />}
    </View>

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