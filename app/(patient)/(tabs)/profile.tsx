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
                            <View style={styles.halfWidth}>
                                <InfoField
                                    label="Gender"
                                    value={user.gender}
                                    labelWidth={43}
                                />
                            </View>
                            <View style={styles.halfWidth}>
                                <InfoField
                                    label="Age"
                                    value={user.age}
                                    labelWidth={40}
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
        justifyContent: "space-between",
        paddingHorizontal: 20,
        marginVertical: 10,
    },
    halfWidth: {
        width: "48%",
    },
});

export default Profile;
