import React, { useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import ScanCard from "@/components/ScanCard";
import { useActionSheet } from "@expo/react-native-action-sheet";
import * as ImagePicker from "expo-image-picker";
import { predictImage } from "@/utils/api";

const ScanTitle = () => (
  <>
    <Text style={styles.title}>Scan</Text>
    <Text style={styles.subtitle}>
      Please choose one of the following options
    </Text>
  </>
);

export default function Scan() {
  const { showActionSheetWithOptions } = useActionSheet();
  const [loading, setLoading] = useState(false);
  const [predictions, setPredictions] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleProceed = async () => {
    const options = ["Open Camera", "Choose from Gallery", "Cancel"];
    const cancelButtonIndex = 2;
    console.log("camera or galary triggered");
    showActionSheetWithOptions(
      { options, cancelButtonIndex },
      async (buttonIndex) => {
        let result: ImagePicker.ImagePickerResult;

        if (buttonIndex === 0) {
          const { status } = await ImagePicker.requestCameraPermissionsAsync();
          if (status !== "granted") {
            alert("Camera permission is required.");
            return;
          }
          result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
          });
        } else if (buttonIndex === 1) {
          const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== "granted") {
            alert("Media library permission is required.");
            return;
          }
          result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
          });
          console.log("Result: ",result);
        } else {
          return;
        }

        if (!result.canceled && result.assets.length > 0) {
          const uri = result.assets[0].uri;
          setLoading(true);
          setError(null);
          console.log("uri: ",uri);
          try {
            const json = await predictImage(uri);
            console.log("Prediction result:", json);
            setPredictions(json.predictions || []);
          } catch (e: any) {
            console.error("Prediction failed", e);
            setError(e.message || "Unknown error");
          } finally {
            setLoading(false);
          }
        }
      }
    );
  };

  return (
    <View style={styles.container}>
      <ScanTitle />
      <ScanCard onPress={handleProceed} />
      {loading && <ActivityIndicator size="large" style={styles.loader} />}
      {error && <Text style={styles.error}>{error}</Text>}
      {predictions.map((p, i) => (
        <View key={i} style={styles.predictionRow}>
          <Text>{`#${p.rank} ${p.class}: ${p.chance_percentage}%`}</Text>
        </View>
      ))}
    </View>
  );
}

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
  loader: {
    marginTop: 20,
  },
  error: {
    marginTop: 20,
    color: "red",
  },
  predictionRow: {
    marginTop: 10,
  },
});
