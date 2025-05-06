import { AuthContext } from '@/context/AuthContext';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useContext } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

const LogoutButton = () => {
    const { logout } = useContext(AuthContext);

    const handleLogout = async () => {
        try {
            await logout();
            router.replace("/(auth)/login");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <Feather name="log-out" size={24} color="#fff" />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        padding: 8,
        borderRadius: 8,
    },
});

export default LogoutButton; 