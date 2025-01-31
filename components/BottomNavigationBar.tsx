import React from "react";
import { View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import IconCamera from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "@/constants/Colors";
const BottomNavigationBar: React.FC = () => {
  const navigation = useNavigation(); // Hook to navigate between pages

  return (
    <View style={styles.bottomNav}>
      <Icon
        name="home"
        style={styles.navIcon}
        color={Colors.light.primary}
        solid={false} // Makes the icon outlined
        onPress={() => navigation.navigate("DoctorDashboard")}
      />
      <Icon
        name="search"
        style={styles.navIcon}
        color={Colors.light.primary}
        solid={false}
      />
      <View style={styles.centerIcon}>
        <IconCamera
          name="camera-alt"
          style={styles.navIcon}
          color={Colors.light.background}
          onPress={() => navigation.navigate("ScanScreen")}
        />
      </View>
      <Icon
        name="bell"
        style={styles.navIcon}
        color={Colors.light.primary}
        solid={false}
      />
      <Icon
        name="user"
        style={styles.navIcon}
        color={Colors.light.primary}
        solid={false}
      />
    </View>
  );
};

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
    paddingVertical: 16,
    width: "100%",
  },
  navIcon: {
    fontSize: 28,
  },
  centerIcon: {
    backgroundColor: "#3D6734",
    padding: 8,
    borderRadius: 50,
    elevation: 50,
    marginBottom: 5,
  },
});

export default BottomNavigationBar;

// import React from "react";
// import { StyleSheet, TouchableOpacity } from "react-native";
// import Icon from "react-native-vector-icons/Feather";
// import IconCamera from "react-native-vector-icons/MaterialIcons";
// import { Colors } from "@/constants/Colors";
// import { Tabs } from "expo-router";

// const BottomNavigationBar: React.FC = () => {
//   return (
//     <Tabs>
//       <Tabs.Screen
//         name="Home"
//         options={{
//           title: "Home",
//           tabBarIcon: ({ color }) => (
//             <Icon name="home" size={28} color={color} />
//           ),
//         }}
//       />

//       <Tabs.Screen
//         name="Search"
//         options={{
//           title: "Search",
//           tabBarIcon: ({ color }) => (
//             <Icon name="search" size={28} color={color} />
//           ),
//         }}
//       />

//       <Tabs.Screen
//         name="CameraScreen"
//         options={{
//           title: "",
//           tabBarButton: (props) => (
//             <TouchableOpacity style={styles.centerIcon} {...props}>
//               <IconCamera
//                 name="camera-alt"
//                 size={28}
//                 color={Colors.light.background}
//               />
//             </TouchableOpacity>
//           ),
//         }}
//       />

//       <Tabs.Screen
//         name="Notifications"
//         options={{
//           title: "Alerts",
//           tabBarIcon: ({ color }) => (
//             <Icon name="bell" size={28} color={color} />
//           ),
//         }}
//       />

//       <Tabs.Screen
//         name="UserProfile"
//         options={{
//           title: "Profile",
//           tabBarIcon: ({ color }) => (
//             <Icon name="user" size={28} color={color} />
//           ),
//         }}
//       />
//     </Tabs>
//   );
// };

// const styles = StyleSheet.create({
//   centerIcon: {
//     backgroundColor: "#3D6734", // Background color for the camera button
//     padding: 8, // Padding around the icon
//     borderRadius: 50, // Make the button circular
//     elevation: 50, // Elevation for shadow effect
//     marginBottom: 5, // Space below the button
//   },
// });

// export default BottomNavigationBar;
