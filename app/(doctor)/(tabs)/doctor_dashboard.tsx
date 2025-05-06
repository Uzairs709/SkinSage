import BottomNavigationBar from "@/app/(doctor)/(tabs)/_layout";
import DoctorProfile from "@/components/DoctorProfile";
import UpcomingAppointments from "@/components/UpcomingAppointments";
import api from "@/utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text } from "react-native";

interface FollowUp {
  patientName: string;
  patientDescription: string;
  appointmentDay: string;
  appointmentDate: string;
  appointmentTime: string;
}

const LoadingSpinner = () => (
  <React.Fragment>
    {/* Replace with ActivityIndicator or custom spinner if needed */}
    <Text style={{ margin: 10, fontSize: 16 }}>Loading appointments...</Text>
  </React.Fragment>
);

const ErrorMessage = ({ message }: { message: string }) => (
  <Text style={{ color: "red", margin: 10 }}>Error: {message}</Text>
);

const NoAppointmentsMessage = () => (
  <Text style={{ margin: 10, fontSize: 16 }}>No follow-up appointments for today.</Text>
);


export default function doctor_dashboard() {
  const [appointments, setAppointments] = useState<FollowUp[]|null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string|undefined>(undefined);
  const [doctorName, setDoctorName] = useState<string>("Doctor");


  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        const userString = await AsyncStorage.getItem("user");
        console.log("USER: " + userString);
        if (!userString) throw new Error("No user in storage");
        const user = JSON.parse(userString);
        const doctorId = user.id;
        setDoctorName(user.name || "Doctor"); // Set doctor name for profile

  
        const res = await api.get(`/doctors/${doctorId}/followups`);
        console.log("Appointments:", res.data);
  
        const data: FollowUp[] = res.data;
        setAppointments(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchAppointments();
  }, []);
  

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.dashboardContainer}>
      <DoctorProfile name={`${doctorName}`} />
      
      <Text style={styles.appointmentsHeading}>Upcoming appointments</Text>

      {appointments &&
          appointments.map((apt, i) => (
            <UpcomingAppointments
              key={i}
              patientName={apt.patientName}
              patientDescription={apt.patientDescription}
              appointmentDay={apt.appointmentDay}
              appointmentDate={apt.appointmentDate}
              appointmentTime={apt.appointmentTime}
            />
          ))}
        <BottomNavigationBar />
      </ScrollView>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  safeArea: {
    marginTop: 30,
    flex: 1, // Ensures the container takes up the full screen height and width
    backgroundColor: "#fff", // Set background color for the whole screen
  },
  dashboardContainer: {
    flexGrow: 1, // Allows content to take up all available space inside ScrollView
    alignItems: "center", // Center content horizontally
    justifyContent: "flex-start", // Align items at the top
    width: "100%", // Ensures full width of the screen
  },
  appointmentsHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    marginLeft: 16,
    alignSelf: "flex-start",
  },
});

