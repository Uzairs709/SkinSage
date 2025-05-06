import ScanCard from "@/components/ScanCard";
import { predictImage } from "@/utils/api";
import { useActionSheet } from "@expo/react-native-action-sheet";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

const ScanTitle = () => (
  <>
    <Text style={styles.title}>Scan</Text>
  </>
);

export default function Scan() {
  const { showActionSheetWithOptions } = useActionSheet();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleProceed = () => {
    const options = ["Open Camera", "Choose from Gallery", "Cancel"];
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        title: "Select Image Source",
        message: "Choose how you want to select the image",
      },
      async (buttonIndex) => {
        let result: ImagePicker.ImagePickerResult;

        if (buttonIndex === 0) {
          const { status } = await ImagePicker.requestCameraPermissionsAsync();
          if (status !== "granted") {
            alert("Camera permission is required.");
            return;
          }
          result = await ImagePicker.launchCameraAsync({
            mediaTypes: "images",
            quality: 1,
          });
        } else if (buttonIndex === 1) {
          const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== "granted") {
            alert("Media library permission is required.");
            return;
          }
          result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: "images",
            quality: 1,
          });
        } else {
          return;
        }

        if (!result.canceled && result.assets.length > 0) {
          const uri = result.assets[0].uri;
          setLoading(true);
          setError(null);
          try {
            const json = await predictImage(uri);
            router.push({
              pathname: "/(doctor)/ResultsScreen",
              params: {
                predictions: JSON.stringify(json.predictions || []),
              },
            });
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
});