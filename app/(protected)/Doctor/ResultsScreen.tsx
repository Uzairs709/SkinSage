import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import AlertBox from "@/components/AlertBox";
import ResultItem from "@/components/ResultItem";
import { useRouter, useLocalSearchParams } from "expo-router";
import PrimaryButton from "@/components/PrimaryButton";

export default function ResultsScreen() {
  const router = useRouter();
  const { predictions } = useLocalSearchParams();
  const parsedPredictions = predictions ? JSON.parse(predictions as string) : [];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Results</Text>
      <AlertBox />

      <View style={styles.sectionHeader}>
        <Text style={styles.subHeader}>Possible Results</Text>
        <View style={styles.separator} />
      </View>

      {parsedPredictions.length === 0 ? (
        <Text>No results available.</Text>
      ) : (
        parsedPredictions.map((p: any, i: number) => (
          <ResultItem
            key={i}
            color={getColorByIndex(i)}
            label={p.class}
            percentage={p.chance_percentage}
          />
        ))
      )}

      <PrimaryButton 
      label="Go Backk"
      onPress={()=>router.back()}
      width="90%"
      />
        
    </ScrollView>
  );
}

const getColorByIndex = (index: number) => {
  const colors = ["#EF4444", "#FACC15", "#374151", "#0EA5E9", "#10B981"];
  return colors[index % colors.length];
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
});
