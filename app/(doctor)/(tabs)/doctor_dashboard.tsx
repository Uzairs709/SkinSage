import BottomNavigationBar from "@/app/(doctor)/(tabs)/_layout";
import DoctorProfile from "@/components/DoctorProfile";
import UpcomingAppointments from "@/components/UpcomingAppointments";
import api from "@/utils/api";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router"; // Make sure this is at the top

import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";

import { Colors } from "@/constants/Colors";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
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
        if (!userString) throw new Error("No user in storage");
        const user = JSON.parse(userString);
        const doctorId = user.id;
        setDoctorName(user.name || "Doctor"); // Set doctor name for profile

  
        const res = await api.get(`/doctors/${doctorId}/followups`);
  
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

      <View style={styles.headerRow}>
        <View style={styles.docName}>
          <DoctorProfile name={`${doctorName}`} />
        </View>
        <TouchableOpacity
          onPress={() => handleChatPress("p001", "Ali Khan")}
          style={styles.chatButton}
        >
          <Feather name="message-circle" size={28} color={Colors.dark.primary} />
        </TouchableOpacity>
      </View>

      <Text style={styles.appointmentsHeading}>Upcoming appointments</Text>
      <ScrollView contentContainerStyle={styles.dashboardContainer} showsVerticalScrollIndicator={false}>
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
    paddingBottom: 100,
  },
  appointmentsHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    marginLeft: 16,
    alignSelf: "flex-start",
    color: Colors.dark.primary,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 10,
    marginTop: 10,
  },
  chatButton: {
    padding: -10,
  },
  docName: {
    flex: 1,
  },
});
