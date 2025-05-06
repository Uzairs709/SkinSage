import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface ResultItemProps {
  color: string;
  label: string;
  percentage: number | null;
}

const ResultItem: React.FC<ResultItemProps> = ({ color, label, percentage }) => {
  const validPercentage = percentage !== null ? percentage : 50; // Default to 50% if null

  return (
    <View style={styles.card}>
      {/* Title */}
      <Text style={styles.label}>{label}</Text>

      {/* Progress Bar */}
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

      {/* Percentage */}
      <Text style={styles.percentageText}>{percentage !== null ? `${percentage}%` : "N/A"}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "black",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Adds shadow for Android
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  progressBarContainer: {
    flexDirection: "row",
    height: 8,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "#D1D5DB", // Grey background for unfilled bar
  },
  progressBarFill: {
    height: "100%",
  },
  progressBarEmpty: {
    height: "100%",
    backgroundColor: "#D1D5DB",
  },
  percentageText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "500",
    textAlign: "right",
  },
});

export default ResultItem;