// import UserItem from "@/components/UserItem";
// import React from "react";
// import { FlatList, SafeAreaView, StyleSheet } from "react-native";

// const users = [
//     { id: "1", name: "M Khizar Imran", profileType: "Medical Profile", imageUrl: "https://randomuser.me/api/portraits/men/1.jpg" },
//     { id: "2", name: "John Doe", profileType: "Medical Profile", imageUrl: "https://randomuser.me/api/portraits/men/2.jpg" },
//     { id: "3", name: "Jane Smith", profileType: "Medical Profile", imageUrl: "https://randomuser.me/api/portraits/women/3.jpg" },

// ];
// export default function Home() {
//     return (
//         <SafeAreaView style={styles.container}>
//             <FlatList
//                 data={users}
//                 keyExtractor={(item) => item.id}
//                 renderItem={({ item }) => (
//                     <UserItem name={item.name} onPress={() => {}} />
//                 )}
//                 contentContainerStyle={styles.listContent}
//             />
//         </SafeAreaView>
//     );
// }
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         marginTop: 20,
//         backgroundColor: "#fff",
//     },
//     listContent: {
//         paddingTop: 10,
//     },
// });

import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Home() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedProfiles, setExpandedProfiles] = useState({});
  // const router = useRouter();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const dummyDoctors = [
          {
            id: 1,
            name: "Dr. Sarah Malik",
            profileType: "Dermatologist",
            imageUrl: "https://randomuser.me/api/portraits/women/44.jpg",
            profileDetails:
              "MBBS, FCPS Dermatology from KEMU. 10 years experience.",
          },
          {
            id: 2,
            name: "Dr. Ahmed Khan",
            profileType: "Skin Specialist",
            imageUrl: "https://randomuser.me/api/portraits/men/32.jpg",
            profileDetails:
              "MD Dermatology from AKU. 8 years clinical experience.",
          },
          {
            id: 3,
            name: "Dr. Malik",
            profileType: "Cosmeticist",
            imageUrl: "https://randomuser.me/api/portraits/women/42.jpg",
            profileDetails:
              "Certified Cosmetic Specialist with 5+ years in aesthetic procedures.",
          },
        ];
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setDoctors(dummyDoctors);
      } catch (err) {
        Alert.alert("Error", "Could not load doctor list.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const toggleProfile = (id) => {
    setExpandedProfiles((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleChat = (docId, docName) => {
    router.push(`/(patient)/messages`);
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={doctors}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.doctorContainer}>
            <View style={styles.row}>
              <Image source={{ uri: item.imageUrl }} style={styles.avatar} />

              <View style={{ flex: 1 }}>
                <View style={styles.rowBetween}>
                  <Text style={styles.doctorName}>{item.name}</Text>
                  {/* <TouchableOpacity
                    onPress={() => handleChat(item.id, item.name)}
                  >
                    <Text style={styles.chatIcon}>💬</Text>
                  </TouchableOpacity> */}
                </View>
                <Text style={styles.profileType}>{item.profileType}</Text>

                <TouchableOpacity onPress={() => toggleProfile(item.id)}>
                  <Text style={styles.medicalProfileText}>
                    Medical Profile &gt;
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {expandedProfiles[item.id] && (
              <View style={styles.profileBox}>
                <Text style={styles.profileText}>{item.profileDetails}</Text>
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
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
    color: "#333",
  },
  chatIcon: {
    fontSize: 20,
    color: "#007AFF",
    paddingHorizontal: 8,
    marginTop: 6, // moves it slightly down
    // borderWidth: 1,
    // borderColor: "green",
    borderRadius: 20,
    padding: 3,
  },

  profileType: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  medicalProfileText: {
    fontStyle: "italic",
    fontSize: 12,
    color: "#007AFF",
    marginTop: 6,
  },
  profileBox: {
    backgroundColor: "#eef3f7",
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
