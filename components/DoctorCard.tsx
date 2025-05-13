// components/DoctorCard.tsx
import { Colors } from "@/constants/Colors";
import { useActionSheet } from '@expo/react-native-action-sheet';
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import React from "react";
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Doctor = {
  id: number;
  name: string;
  license_number: string;
  doc_designation: string | null;
  doc_specialization: string | null;
  popularity: number;
  imageUrl?: string | null;
};

interface Props {
  doctor: Doctor;
  expanded: boolean;
  toggleProfile: (id: number) => void;
  onChat: (id: number, name: string, imageUri?: string) => void;
}

export const DoctorCard = ({ doctor, expanded, toggleProfile, onChat }: Props) => {
  const { showActionSheetWithOptions } = useActionSheet();

  const handleImageSelection = async () => {
    const options = ['Take Photo', 'Choose from Gallery', 'Cancel'];
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async (selectedIndex) => {
        if (selectedIndex === 0) {
          // Take Photo
          const { status } = await ImagePicker.requestCameraPermissionsAsync();
          if (status !== 'granted') {
            Alert.alert('Permission needed', 'Please grant camera permissions to take photos');
            return;
          }
          const result = await ImagePicker.launchCameraAsync({
            mediaTypes: 'images',
            allowsEditing: true,
            quality: 1,
          });
          if (!result.canceled && result.assets[0].uri) {
            onChat(doctor.id, doctor.name, result.assets[0].uri);
          }
        } else if (selectedIndex === 1) {
          // Choose from Gallery
          const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== 'granted') {
            Alert.alert('Permission needed', 'Please grant gallery permissions to select images');
            return;
          }
          const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: 'images',
            allowsEditing: true,
            quality: 1,
          });
          if (!result.canceled && result.assets[0].uri) {
            onChat(doctor.id, doctor.name, result.assets[0].uri);
          }
        }
      }
    );
  };

  return (
    <View style={styles.doctorContainer}>
      <View style={styles.row}>
        <Image 
          source={{ 
            uri: doctor.imageUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(doctor.name)}` 
          }} 
          style={styles.avatar} 
        />
        <View style={{ flex: 1 }}>
          <View style={styles.rowBetween}>
            <Text style={styles.doctorName}>{doctor.name}</Text>
            <TouchableOpacity onPress={handleImageSelection}>
              <Ionicons name="chatbubble-outline" size={24} color={Colors.dark.primary} />
            </TouchableOpacity>
          </View>
          <Text style={styles.profileType}>
            {doctor.doc_designation || "General Practitioner"}
          </Text>
          <TouchableOpacity onPress={() => toggleProfile(doctor.id)}>
            <Text style={styles.medicalProfileText}>Medical Profile &gt;</Text>
          </TouchableOpacity>
        </View>
      </View>
      {expanded && doctor.doc_specialization && (
        <View style={styles.profileBox}>
          <Text style={styles.profileText}>
            {doctor.doc_specialization}
          </Text>
        </View>
      )}
    </View>
  );
};

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
