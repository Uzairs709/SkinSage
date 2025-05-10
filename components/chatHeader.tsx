// components/ChatHeader.tsx
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ChatHeaderProps {
  image: string;
  patientName: string;
  onPressPrescription: () => void;
}

export default function ChatHeader({ image, patientName, onPressPrescription }: ChatHeaderProps) {
  const router = useRouter();

  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backIcon} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color={Colors.dark.primary} />
      </TouchableOpacity>
      <Image source={{ uri: image }} style={styles.profileImage} />
      <View style={styles.nameStatusContainer}>
        <Text style={styles.docName}>{patientName}</Text>
      </View>
      <View style={styles.headerIcons}>
        <TouchableOpacity onPress={onPressPrescription}>
          <Ionicons name="medkit" size={20} color={Colors.dark.primary} />
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
  docName: {
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
});
