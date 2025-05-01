import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

type DoctorProfileProps = {
  name: string;
};

const DoctorProfile: React.FC<DoctorProfileProps> = ({ name }) => (
  <View style={styles.doctorProfile}>
    <Image
      source={require("../assets/images/Avatar-Doc-Male.png")}
      style={styles.doctorProfileImg}
    />
    <View>
      <Text style={styles.doctorName}>{name}</Text>
      <Text style={styles.doctorRole}>Medical Profile</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  doctorProfile: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 16,
  },
  doctorProfileImg: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  doctorRole: {
    color: "#3c8f65",
  },
});

export default DoctorProfile;
