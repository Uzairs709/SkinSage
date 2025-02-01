import React from "react";
import { View, ScrollView, StyleSheet, SafeAreaView } from "react-native";
import DoctorProfile from "@/components/DoctorProfile";
import UpcomingAppointments from "@/components/UpcomingAppointments";
import BottomNavigationBar from "@/app/(tabs)/_layout";

export default function doctor_dashboard(){
  return (
  <SafeAreaView style={styles.safeArea}>
    <ScrollView contentContainerStyle={styles.dashboardContainer}>
      <DoctorProfile />
      <UpcomingAppointments />
      <BottomNavigationBar />
    </ScrollView>
  </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1, // Ensures the container takes up the full screen height and width
    backgroundColor: "#fff", // Set background color for the whole screen
  },
  dashboardContainer: {
    flexGrow: 1, // Allows content to take up all available space inside ScrollView
    alignItems: "center", // Center content horizontally
    justifyContent: "flex-start", // Align items at the top
    width: "100%", // Ensures full width of the screen
  },
});

