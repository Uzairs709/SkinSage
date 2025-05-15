import { DoctorCard } from "@/components/DoctorCard";
import { Colors } from "@/constants/Colors";
import api from "@/utils/api";
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
  license_number: string;
  doc_designation: string | null;
  doc_specialization: string | null;
  popularity: number;
  imageUrl?: string | null;
};

export default function Home() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(false);
  const [expandedProfiles, setExpandedProfiles] = useState<Record<number, boolean>>({});
  const [user, setUser] = useState<{ name: string; token: string }>(() => ({ name: "", token: "" }));

  useEffect(() => {
    const getUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          const parsed = JSON.parse(storedUser);
          setUser({ name: parsed.name, token: parsed.token });
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    getUser();
  }, []);

  useEffect(() => {

    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const { data } = await api.get('/doctors/popular');
        // Map API data to Doctor type
        const mapped: Doctor[] = data.map((d: any) => ({
          id: d.id,
          name: d.name,
          license_number: d.license_number,
          doc_designation: d.doc_designation,
          doc_specialization: d.doc_specialization,
          imageUrl: null // We'll use UI Avatars as fallback in the DoctorCard component
        }));
        setDoctors(mapped);
      } catch (error) {
        console.error(error);
        Alert.alert("Error", "Could not load doctor list.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  
  }, [user.token]);

  const toggleProfile = (id: number) => {
    setExpandedProfiles((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleChat = (docId: number, docName: string, imageUri?: string) => {
    router.push({
      pathname: `/(patient)/messages/[docId]`,
      params: { 
        docId: docId.toString(), 
        name: docName,
        imageUri: imageUri || '' 
      },
    });
  };

  if (loading) return <ActivityIndicator size="large" />;

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
            onChat={handleChat}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingTop: 30, paddingBottom: 50 },
  header: { paddingHorizontal: 20, paddingBottom: 20 },
  welcomeText: { fontSize: 16, color: "#34673D" },
  patientName: { fontSize: 24, fontWeight: "bold", color: Colors.dark.primary },
});