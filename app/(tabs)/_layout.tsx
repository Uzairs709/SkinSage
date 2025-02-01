import { Tabs } from "expo-router";
import { StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import IconCamera from "react-native-vector-icons/MaterialIcons";
import { Colors } from "@/constants/Colors";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: styles.bottomNav,
      }}
    >
      {/* Home Tab */}
      <Tabs.Screen
        name="doctor_dashboard"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />

      {/* Search Tab */}
      {/* <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="search" size={size} color={color} />
          ),
        }}
      /> */}

      {/* Center Camera Button */}
      <Tabs.Screen
        name="scan"
        options={{
          tabBarButton: (props) => <CameraButton {...props} />,
        }}
      />

      {/* Notifications Tab */}
      {/* <Tabs.Screen
        name="notifications"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="bell" size={size} color={color} />
          ),
        }}
      /> */}

      {/* Profile Tab */}
      {/* <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="user" size={size} color={color} />
          ),
        }}
      /> */}
    </Tabs>
  );
}

// 🔹 Fix: Separate Component for Camera Button
const CameraButton = (props: any) => (
  <TouchableOpacity {...props} style={[styles.centerIcon, props.style]}>
    <IconCamera name="camera-alt" size={28} color={"#fff"} />
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
  centerIcon: {
    backgroundColor: Colors.light.primary,
    padding: 12,
    borderRadius: 50,
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    elevation: 5,
  },
});
