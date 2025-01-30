import React from "react";
import { View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import IconCamera from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";

const colors = {
  text: "#000000",
  background: "#ffffff",
  primary: "#3D6734", // primary color
  blackOutline: "#000000",
};

const BottomNavigationBar: React.FC = () => {
  const navigation = useNavigation(); // Hook to navigate between pages

  return (
    <View style={styles.bottomNav}>
      <View style={styles.topLine} />
      <Icon
        name="home"
        style={styles.navIcon}
        color={colors.primary}
        onPress={() => navigation.navigate("DoctorDashboard")} // Navigate to DoctorDashboard
      />
      <Icon
        name="search"
        style={styles.navIcon}
        color={colors.primary}
        // onPress={() => navigation.navigate("ExplorePage")} // Navigate to ExplorePage
      />
      <View style={styles.centerIcon}>
        <IconCamera
          name="camera-alt"
          style={styles.navIcon}
          color={colors.background}
          onPress={() => {
            // Add camera opening functionality
            alert("Open camera here");
          }}
        />
      </View>
      <Icon
        name="bell"
        style={styles.navIcon}
        color={colors.primary}
        // onPress={() => navigation.navigate("NotificationsPage")} // Navigate to NotificationsPage
      />
      <Icon
        name="user"
        style={styles.navIcon}
        color={colors.primary}
        // onPress={() => navigation.navigate("ProfilePage")} // Navigate to ProfilePage
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
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    width: "100%", // Full width for the bottom navigation bar
  },
  topLine: {
    position: "absolute",
    top: -8,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: "black",
    borderRadius: 0,
  },
  navIcon: {
    fontSize: 30,
  },
  centerIcon: {
    // top: -40, // Adjust this value to move the icon upwards
    backgroundColor: "#3D6734", // Corrected color code format (hex)
    padding: 8,
    borderRadius: 50,
    elevation: 50, // For Android shadow effect
    marginBottom: 5, // To push it slightly above
  },
  // centerIcon: {
  //   backgroundColor: "#3D6734", // Corrected color code format (hex)
  //   padding: 8,
  //   borderRadius: 50, // Circular shape
  //   elevation: 50, // For Android shadow effect
  //   marginBottom: 5, // To push it slightly above
  //   position: "absolute", // Positioning it absolutely to adjust its placement
  //   top: -40, // Adjust this value to move the icon upwards
  //   left: 180,
  // },
});

export default BottomNavigationBar;
