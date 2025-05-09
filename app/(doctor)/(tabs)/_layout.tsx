import { HapticTab } from "@/components/HapticTab";
import { Colors } from "@/constants/Colors";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: styles.bottomNav,
        tabBarActiveTintColor: Colors.light.primary,
        headerShown:false,
        tabBarButton: HapticTab,
        
      }}
    >
      {/* Home Tab */}
      <Tabs.Screen
        name="doctor_dashboard"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color} />
          ),
        }}
      />

      {/* Camera (Scan) Tab */}
      <Tabs.Screen
        name="scan"
        options={{
          tabBarButton: (props) => <CameraButton {...props} />,
        }}
      />

      {/* Profile Tab */}
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

// ✅ Fixed Camera Button Component
const CameraButton = ({ onPress, ...props }: any) => (
  <TouchableOpacity onPress={onPress} style={[styles.cameraButton, props.style]}>
    <View style={styles.cameraButtonInner}>
      <MaterialIcons name="camera-alt" size={28} color={"#fff"} />
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 12,
    height: 60,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -2 },
  },
  cameraButton: {
    position: "absolute",
    bottom: 1, // Moves it slightly above the navbar
    alignSelf: "center",
  },
  cameraButtonInner: {
    backgroundColor: Colors.light.primary,
    width: 56, // Fixed width for perfect circle
    height: 56, // Fixed height for perfect circle
    borderRadius: 28, // Half of width/height to make it round
    justifyContent: "center",
    alignItems: "center",
    elevation: 5, // Adds shadow on Android
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
  },
});