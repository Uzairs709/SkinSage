import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface ResultItemProps {
  color: string;
  label: string;
  percentage: number;
}

const ResultItem: React.FC<ResultItemProps> = ({ color, label, percentage }) => {
  return (
    <View style={styles.container}>
      <View style={[styles.progressBar, { backgroundColor: color, width: `${percentage}%` }]} />
      <Text style={styles.text}>{label} {percentage}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  progressBar: {
    height: 8,
    borderRadius: 5,
    marginRight: 10,
  },
  text: {
    fontSize: 14,
    fontWeight: "500",
  },
});

export default ResultItem;
