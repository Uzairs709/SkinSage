import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "@/constants/Colors";

interface ScanCardProps {
  onPress: () => void;
}

const ScanCard: React.FC<ScanCardProps> = ({ onPress }) => {
  return (
    <View style={styles.card}>
      <Image
        source={require("../assets/images/scan.jpg")} // Replace with actual image path
        style={styles.image}
      />
      <Text style={styles.heading}>Analysis</Text>
      <Text style={styles.description}>
        Please choose the following options.
      </Text>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: Colors.light.primary }]}
        onPress={onPress}
      >
        <Text style={styles.buttonText}>Proceed</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  image: {
    width: 350,
    height: 190,
    resizeMode: "contain",
    marginBottom: 15,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "left",
  },
  description: {
    textAlign: "left",
    fontSize: 14,
    color: "gray",
    marginBottom: 15,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 50,
    marginRight: -200,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ScanCard;
