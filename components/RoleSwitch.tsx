// components/RoleSwitch.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

interface RoleSwitchProps {
  selectedRole: string;
  onRoleChange: (role: string) => void;
}

const RoleSwitch: React.FC<RoleSwitchProps> = ({
  selectedRole,
  onRoleChange,
}) => {
  return (
    <View style={styles.switchWrapper}>
      <View style={styles.switchContainer}>
        <Text
          style={[
            styles.switchText,
            selectedRole === "Doctor"
              ? styles.activeSwitch
              : styles.inactiveSwitch,
          ]}
          onPress={() => onRoleChange("Doctor")}
        >
          Doctor
        </Text>
        <Text
          style={[
            styles.switchText,
            selectedRole === "Patient"
              ? styles.activeSwitch
              : styles.inactiveSwitch,
          ]}
          onPress={() => onRoleChange("Patient")}
        >
          Patient
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  switchWrapper: {
    backgroundColor: "#fff", // White background for the container
    borderRadius: 25, // Round border for the container
    overflow: "hidden", // Ensures the rounded corners are applied to the content
    marginHorizontal: 100, // Adjust left and right margin to make it closer
    marginVertical: -10, // Adjust vertical margin for better spacing
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly", // Makes the switches more closely placed
    paddingVertical: 5, // Reduced padding inside the container
    backgroundColor: "#f0f0f0", // Gray background for the whole switch
    borderRadius: 50,
    // Round border for the entire switch container
  },
  switchText: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 0,
    borderRadius: 40, // Round border for each button
    color: "#000", // Default black text
    textAlign: "center",
    lineHeight: 24,
  },
  activeSwitch: {
    backgroundColor: "#3D6734", // Green background for the active option
    color: "#fff", // White text when active
  },
  inactiveSwitch: {
    backgroundColor: "#f0f0f0", // Gray background for the inactive option
    color: "#000", // Black text when inactive
  },
});

export default RoleSwitch;
