// components/DoctorCard.tsx
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Doctor = {
  id: number;
  name: string;
  profileType: string;
  imageUrl: string;
  profileDetails: string;
};

interface Props {
  doctor: Doctor;
  expanded: boolean;
  toggleProfile: (id: number) => void;
  onChat: (id: number, name: string) => void;
}

export const DoctorCard = ({ doctor, expanded, toggleProfile, onChat }: Props) => (
  <View style={styles.doctorContainer}>
    <View style={styles.row}>
      <Image source={{ uri: doctor.imageUrl }} style={styles.avatar} />
      <View style={{ flex: 1 }}>
        <View style={styles.rowBetween}>
          <Text style={styles.doctorName}>{doctor.name}</Text>
          <TouchableOpacity onPress={() => onChat(doctor.id, doctor.name)}>
            <Ionicons name="chatbubble-outline" size={24} color={Colors.dark.primary} />
          </TouchableOpacity>
        </View>
        <Text style={styles.profileType}>{doctor.profileType}</Text>
        <TouchableOpacity onPress={() => toggleProfile(doctor.id)}>
          <Text style={styles.medicalProfileText}>Medical Profile &gt;</Text>
        </TouchableOpacity>
      </View>
    </View>
    {expanded && (
      <View style={styles.profileBox}>
        <Text style={styles.profileText}>{doctor.profileDetails}</Text>
      </View>
    )}
  </View>
);

const styles = StyleSheet.create({
  doctorContainer: {
    marginBottom: 20,
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    maxWidth: "90%",
    alignItems: "center",
    flex: 1,
    alignSelf: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  doctorName: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.dark.primary,
  },
  profileType: {
    fontSize: 14,
    color: "#34673D",
    marginTop: 2,
  },
  medicalProfileText: {
    fontStyle: "italic",
    fontSize: 12,
    color: Colors.dark.primary,
    marginTop: 6,
  },
  profileBox: {
    backgroundColor: "#DDEBDD",
    padding: 10,
    borderRadius: 6,
    marginTop: 10,
  },
  profileText: {
    fontSize: 13,
    color: "#333",
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 30,
    marginRight: 10,
  },
});
