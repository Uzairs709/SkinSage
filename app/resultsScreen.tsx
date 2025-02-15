import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import AlertBox from "../components/AlertBox";
import ResultItem from "../components/ResultItem";
import { useNavigation } from "@react-navigation/native";

export default function resultsScreen () {

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Results</Text>
      <AlertBox />

      <Text style={styles.subHeader}>Possible Results</Text>

      <ResultItem color="#EF4444" label="Eczema" percentage={71} />
      <ResultItem color="#FACC15" label="Acne" percentage={31} />
      <ResultItem color="#374151" label="Melasma" percentage={13} />

      {/* <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Home")}>
        <Text style={styles.buttonText}>Back to Home</Text>
      </TouchableOpacity> */}

    </ScrollView>
  );
};

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
  subHeader: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#14532D",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
