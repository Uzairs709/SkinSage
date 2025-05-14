import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface DoctorChatHeaderProps {
  image: string;
  patientName: string;
  onViewPrescription: () => void;
  onAddFollowUp: () => void;
}

export default function DoctorChatHeader({
  image,
  patientName,
  onViewPrescription,
  onAddFollowUp,
}: DoctorChatHeaderProps) {
  const router = useRouter();

  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backIcon} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color={Colors.dark.primary} />
      </TouchableOpacity>
      <Image source={{ uri: image }} style={styles.profileImage} />
      <View style={styles.nameStatusContainer}>
        <Text style={styles.patientName}>{patientName}</Text>
      </View>
      <View style={styles.headerIcons}>
        <TouchableOpacity 
          style={styles.iconButton} 
          onPress={onViewPrescription}
        >
          <Ionicons name="document-text" size={20} color={Colors.dark.primary} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.iconButton} 
          onPress={onAddFollowUp}
        >
          <Ionicons name="add-circle" size={20} color={Colors.dark.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
  },
  nameStatusContainer: {
    flexDirection: "column",
    justifyContent: "center",
  },
  patientName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2d2d2d",
    marginBottom: 2,
  },
  profileImage: {
    width: 42,
    height: 42,
    borderRadius: 21,
    marginRight: 12,
  },
  headerIcons: {
    marginLeft: "auto",
    flexDirection: "row",
    alignItems: "center",
  },
  backIcon: {
    marginRight: 10,
  },
  iconButton: {
    marginLeft: 15,
  },
}); 