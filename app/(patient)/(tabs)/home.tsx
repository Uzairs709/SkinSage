import { DoctorCard } from "@/components/DoctorCard";
import { Colors } from "@/constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

type Doctor = {
  id: number;
  name: string;
  profileType: string;
  imageUrl: string;
  profileDetails: string;
};

export default function Home() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedProfiles, setExpandedProfiles] = useState<Record<number, boolean>>({});
  const [user, setUser] = useState<{ name: string }>({ name: "" });

  useEffect(() => {
    const getUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    getUser();
  }, []);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const dummyDoctors: Doctor[] = [
          {
            id: 1,
            name: "Dr. Sarah Malik",
            profileType: "Dermatologist",
            imageUrl: "https://randomuser.me/api/portraits/women/44.jpg",
            profileDetails: "MBBS, FCPS Dermatology from KEMU. 10 years experience.",
          },
          {
            id: 2,
            name: "Dr. Ahmed Khan",
            profileType: "Skin Specialist",
            imageUrl: "https://randomuser.me/api/portraits/men/32.jpg",
            profileDetails: "MD Dermatology from AKU. 8 years clinical experience.",
          },
          {
            id: 3,
            name: "Dr. Malik",
            profileType: "Cosmeticist",
            imageUrl: "https://randomuser.me/api/portraits/women/42.jpg",
            profileDetails: "Certified Cosmetic Specialist with 5+ years in aesthetic procedures.",
          },
        ];
        await new Promise((res) => setTimeout(res, 1000));
        setDoctors(dummyDoctors);
      } catch {
        Alert.alert("Error", "Could not load doctor list.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const toggleProfile = (id: number) => {
    setExpandedProfiles((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleChat = (docId: number, docName: string, imageUrl: string) => {
    router.push({
      pathname: `/(patient)/messages/[docId]`,
      params: { docId: docId.toString(), name: docName, image: imageUrl },
    });
  };

  if (loading) return <ActivityIndicator size="large"/>;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome back,</Text>
        <Text style={styles.patientName}>{user.name || "Guest"}</Text>
      </View>
      <FlatList
        data={doctors}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <DoctorCard
            doctor={item}
            expanded={!!expandedProfiles[item.id]}
            toggleProfile={toggleProfile}
            onChat={() => handleChat(item.id, item.name, item.imageUrl)}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingTop: 50 },
  header: { paddingHorizontal: 20, paddingBottom: 20 },
  welcomeText: { fontSize: 16, color: "#34673D" },
  patientName: { fontSize: 24, fontWeight: "bold", color: Colors.dark.primary },
});
