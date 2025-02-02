import React from "react";
import { View, Text, StyleSheet } from "react-native";

const UpcomingAppointments: React.FC = () => (
  <View style={styles.appointments}>
    <Text style={styles.appointmentsHeading}>Upcoming appointments</Text>
    <View style={styles.appointmentCard}>
      <View style={styles.appointmentDate}>
        <Text style={styles.appointmentDay}>20</Text>
        <Text>Tue</Text>
      </View>
      <View style={styles.appointmentDetails}>
        <Text style={styles.patientName}>Mr. Smith</Text>
        <Text style={styles.patientDescription}>Eczema Ptient</Text>
      </View>
      <Text style={styles.appointmentTime}>10:30 am</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  appointments: {
    padding: 16,
  },
  appointmentsHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  appointmentCard: {
    backgroundColor: "#f3f3f3",
    padding: 16,
    borderRadius: 10,
    elevation: 5, // For shadow effect in React Native (Android)
    shadowColor: "#000", // For shadow effect (iOS)
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    flexDirection: "row", // Align items horizontally
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%", // Make it take full width
  },
  appointmentDate: {
    textAlign: "center",
    backgroundColor:"#fff",
    paddingTop:5,
    paddingBottom:5,
    paddingLeft:15,
    paddingRight:15,
    borderRadius:10,
  },
  appointmentDay: {
    fontSize: 24,
    fontWeight: "bold",
  },
  appointmentDetails: {
    flexGrow: 1,
    paddingLeft: 16,
  },
  appointmentTime: {
    backgroundColor: "#3D6734", // Green color
    color: "white",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 50,
  },
  patientName:{
    fontWeight: 'bold',
  },
  patientDescription:{
    fontWeight: 'bold',
  }
});

export default UpcomingAppointments;
