import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
type AppointmentProps = {
  patientId: string;
  patientName: string;
  patientDescription: string;
  appointmentDay: string;
  appointmentDate: string;
  appointmentTime: string;
};
const router = useRouter();

const UpcomingAppointments: React.FC<AppointmentProps> = ({
  patientId,
  patientName,
  patientDescription,
  appointmentDay,
  appointmentDate,
  appointmentTime,
}) => (
  <View style={styles.appointmentCard}>
    <View style={styles.appointmentDate}>
      <Text style={styles.appointmentDay}>{appointmentDate}</Text>
      <Text>{appointmentDay}</Text>
    </View>

    <View style={styles.appointmentDetails}>
      <Text style={styles.patientName}>{patientName}</Text>
      <Text
        style={styles.patientDescription}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {patientDescription}
      </Text>
    </View>

    <View style={styles.appointmentTimeContainer}>
      <Text style={styles.appointmentTime}>{appointmentTime}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  appointments: {
    padding: 16,
    width: "100%", // ensure full width
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
    elevation: 5,
    marginTop: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: "90%",
    flex: 1,
    alignSelf: "center",
    maxHeight: "15%"
  },

  appointmentDate: {
    textAlign: "center",
    backgroundColor: "#fff",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  appointmentDay: {
    fontSize: 24,
    fontWeight: "bold",
  },
  appointmentDetails: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 8,
    minWidth: 0,
  },
  appointmentTimeContainer: {
    flexShrink: 0,
    marginLeft: 8,
  },

  appointmentTime: {
    backgroundColor: "#3D6734",
    color: "white",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 50,
    textAlign: "center",
    minWidth: 60,
  },
  patientName: {
    fontWeight: "bold",
    marginBottom: 2,
  },
  patientDescription: {
    fontWeight: "bold",
    flexShrink: 1, // allows text to truncate
  },
});

export default UpcomingAppointments;
