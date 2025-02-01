import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ScanCard from "@/components/ScanCard";
import BottomNavigationBar from "@/app/(tabs)/_layout";

const ScanTitle = () => (
  <>
    <Text style={styles.title}>Scan</Text>
    <Text style={styles.subtitle}>
      Please choose one of the following options
    </Text>
  </>
);

export default function scan() {
  const navigation = useNavigation();

  const handleProceed = () => {
  };

  return (
    <View style={styles.container}>
      <ScanTitle />
      <ScanCard onPress={handleProceed} />
      <BottomNavigationBar /> {/* Add the Bottom Navigation Bar */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "gray",
    marginBottom: 20,
  },
});

