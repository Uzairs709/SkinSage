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
    <View style={styles.switchContainer}>
      <Text
        style={[
          styles.switchText,
          selectedRole === "Doctor" && styles.activeSwitch,
        ]}
        onPress={() => onRoleChange("Doctor")}
      >
        Doctor
      </Text>
      <Text
        style={[
          styles.switchText,
          selectedRole === "Patient" && styles.activeSwitch,
        ]}
        onPress={() => onRoleChange("Patient")}
      >
        Patient
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 0,
  },
  switchText: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 15,
    borderWidth: 2,
    borderColor: Colors.light.primary,
    borderRadius: 25, // Making the buttons round
    color: Colors.light.primary,
    textAlign: "center",
    lineHeight: 24,
  },
  activeSwitch: {
    backgroundColor: Colors.light.primary,
    color: "#fff",
  },
});

export default RoleSwitch;
