import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

interface DoctorProfileProps {
  name: string;
}

const DoctorProfile: React.FC<DoctorProfileProps> = ({ name }) => (
  <View style={styles.doctorProfile}>
    <Image
      source={require("../assets/images/Avatar-Doc-Male.png")} // Correct image import method
      style={styles.doctorProfileImg}
    />
    <View>
      <Text style={styles.doctorName}>Dr. {name}</Text>
      <Text style={styles.doctorRole}>Medical Profile</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  doctorProfile: {
    flexDirection: "row", // Align items horizontally
    alignItems: "center",
    width: "100%", // Ensure full width

    padding: 16,
  },
  doctorProfileImg: {
    width: 48,
    height: 48,
    borderRadius: 24, // Half of width/height for a circular image
    marginRight: 16,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  doctorRole: {
    color: "#3c8f65", // Green color
  },
});

export default DoctorProfile;
