import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface ResultItemProps {
  color: string;
  label: string;
  percentage: number | null;
}

const ResultItem: React.FC<ResultItemProps> = ({ color, label, percentage }) => {
  const validPercentage = percentage !== null ? percentage : 80; // Default to 50% if null

  return (
    <View style={styles.container}>
      <View style={styles.progressBarContainer}>
        <View
          style={[
            styles.progressBarFill,
            { backgroundColor: color, width: `${validPercentage}%` },
          ]}
        />
        <View
          style={[
            styles.progressBarEmpty,
            { width: `${100 - validPercentage}%` },
          ]}
        />
      </View>
      <Text style={styles.text}>{label} {percentage !== null ? `${percentage}%` : "N/A"}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  progressBarContainer: {
    flexDirection: "row",
    height: 8,
    borderRadius: 5,
    overflow: "hidden",
    flex: 1,
  },
  progressBarFill: {
    height: "100%",
  },
  progressBarEmpty: {
    height: "100%",
    backgroundColor: "#D1D5DB", // Grey for empty portion
  },
  text: {
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 10,
  },
});

export default ResultItem;
