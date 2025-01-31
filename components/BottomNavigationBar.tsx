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
          onPress={() => alert("Open camera here")}
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
