import BottomNavigationBar from "@/app/(doctor)/(tabs)/_layout";
import DoctorProfile from "@/components/DoctorProfile";
import UpcomingAppointments from "@/components/UpcomingAppointments";
import api from "@/utils/api";
import { useRouter } from "expo-router"; // Make sure this is at the top
import Icon from "react-native-vector-icons/Feather";

import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";

import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

interface FollowUp {
  patientId: string;

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
  <Text style={{ margin: 10, fontSize: 16 }}>
    No follow-up appointments for today.
  </Text>
);

export default function doctor_dashboard() {
  const [appointments, setAppointments] = useState<FollowUp[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [doctorName, setDoctorName] = useState<string>("Doctor");
  const router = useRouter(); // Use inside the component

  // Move handleChatPress function outside of useEffect
  const handleChatPress = (patientId: string, patientName: string) => {
    router.push({
      pathname: "/(doctor)/chatlist",
      params: {
        patientId,
        patientName,
      },
    });
  };

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

        setAppointments([
          {
            patientId: "p001",
            patientName: "Ali Khan",
            patientDescription: "High fever and headache",
            appointmentDay: "Mon",
            appointmentDate: "05",
            appointmentTime: "10:00 AM",
          },
          {
            patientId: "p002",
            patientName: "Sara Malik",
            patientDescription: "Routine checkup",
            appointmentDay: "Tue",
            appointmentDate: "06",
            appointmentTime: "02:30 PM",
          },
          {
            patientId: "p003",
            patientName: "Ahmed Raza",
            patientDescription: "Follow-up after surgery",
            appointmentDay: "Wed",
            appointmentDate: "07",
            appointmentTime: "12:15 PM",
          },
          {
            patientId: "p004",
            patientName: "Fatima Zahra",
            patientDescription: "Blood pressure concerns",
            appointmentDay: "Thu",
            appointmentDate: "08",
            appointmentTime: "11:00 AM",
          },
          {
            patientId: "p005",
            patientName: "Hassan Ali",
            patientDescription: "Chronic back pain",
            appointmentDay: "Fri",
            appointmentDate: "09",
            appointmentTime: "04:00 PM",
          },
          {
            patientId: "p006",
            patientName: "Mehwish Noor",
            patientDescription: "Skin allergy",
            appointmentDay: "Sat",
            appointmentDate: "10",
            appointmentTime: "09:30 AM",
          },
          {
            patientId: "p007",
            patientName: "Bilal Ahmed",
            patientDescription: "Diabetes follow-up",
            appointmentDay: "Sun",
            appointmentDate: "11",
            appointmentTime: "01:45 PM",
          },
          {
            patientId: "p008",
            patientName: "Mehwish Noor",
            patientDescription: "Skin allergy",
            appointmentDay: "Sat",
            appointmentDate: "10",
            appointmentTime: "09:30 AM",
          },
          {
            patientId: "p009",
            patientName: "Bilal Ahmed",
            patientDescription: "Diabetes follow-up",
            appointmentDay: "Sun",
            appointmentDate: "11",
            appointmentTime: "01:45 PM",
          },
        ]);
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
        <TouchableOpacity
          onPress={() => handleChatPress("p001", "Ali Khan")} // Call with patientId and patientName
          style={styles.chatButton}
        >
          <Icon name="message-circle" size={25} color="#007bff" />
        </TouchableOpacity>

        <Text style={styles.appointmentsHeading}>Upcoming appointments</Text>

        {appointments &&
          appointments.map((apt, i) => (
            <UpcomingAppointments
              key={i}
              patientId={apt.patientId}
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
  );
}

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
  chatButton: {
    padding: 4,
    marginLeft: 350,
    marginTop: -40,
    // color: "green",
  },
});
