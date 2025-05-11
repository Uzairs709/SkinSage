import InfoField from "@/components/InfoField";
import ProfileHeader from "@/components/ProfileHeader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

interface User {
  name: string;
  email: string;
  age: string;
  gender: string;
}

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          // Ensure age is a string
          parsedUser.age = String(parsedUser.age);
          setUser(parsedUser);
        }
      } catch (error) {
        console.error("Failed to load user from storage:", error);
      }
    };

    loadUser();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <ProfileHeader name={user?.name || "User"} />
        {user ? (
          <>
            <InfoField label="Name" value={user.name} labelWidth={43} />
            <InfoField label="Email" value={user.email} labelWidth={40} />
            <View style={styles.row}>
              <View style={styles.leftAligned}>
                <InfoField label="Gender" value={user.gender} labelWidth={55} />
              </View>
              <View style={styles.rightAligned}>
                <InfoField 
                  label="Age" 
                  value={user.age} 
                  labelWidth={40}
                  editable={false}
                />
              </View>
            </View>
          </>
        ) : (
          <Text style={styles.loading}>Loading profile...</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loading: {
    marginTop: 20,
    fontSize: 16,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingHorizontal: 1,
    marginVertical: 8,
  },
  leftAligned: {
    flex: 1,
    marginRight: -13,
  },
  rightAligned: {
    width: "50%", // adjust width as needed
  },
  halfWidth: {
    width: "48%",
  },
});

export default Profile;
