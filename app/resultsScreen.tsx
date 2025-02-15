import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import AlertBox from "../components/AlertBox";
import ResultItem from "../components/ResultItem";
import { useRouter } from "expo-router";
import { useFonts } from "expo-font";


export default function ResultsScreen() {
  
  const router = useRouter();
  

  return (
    
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Results</Text>
      <AlertBox />

      <View style={styles.sectionHeader}>
        <Text style={styles.subHeader}>Possible Results</Text>
        <View style={styles.separator} />
      </View>

      <ResultItem color="#EF4444" label="Eczema" percentage={null} />
      <View style={styles.itemSeparator} />

      <ResultItem color="#FACC15" label="Acne" percentage={null} />
      <View style={styles.itemSeparator} />

      <ResultItem color="#374151" label="Melasma" percentage={null} />
      <View style={styles.itemSeparator} />

      <TouchableOpacity style={styles.button} onPress={() => router.push("/")}>
        <Text style={styles.buttonText}>Back to Home</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  sectionHeader: {
    marginTop: 15,
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 16,
    fontWeight: "bold",
  },
  separator: {
    height: 1,
    backgroundColor: "black",
    marginTop: 10,
  },
  itemSeparator: {
    height: 1,
    backgroundColor: "#000000",
    marginVertical: 8,
  },
  button: {
    backgroundColor: "#14532D",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 200,
    width: "100%", // Adjust if AlertBox has a specific width
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
