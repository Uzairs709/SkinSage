import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ScanCard from "@/components/ScanCard";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import * as ImagePicker from "expo-image-picker";

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

  const handleProceed = async () => {
    const options = ["Open Camera", "Choose from Gallery", "Cancel"];
    const cancelButtonIndex = 2;
  
    showActionSheetWithOptions(
      { options, cancelButtonIndex },
      async (buttonIndex) => {
        if (buttonIndex === 0) {
          const { status } = await ImagePicker.requestCameraPermissionsAsync();
          if (status !== "granted") {
            alert("Camera permission is required.");
            return;
          }
          const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
          });
          if (!result.canceled) {
            console.log("Camera photo URI:", result.assets[0].uri);
          }
        } else if (buttonIndex === 1) {
          const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== "granted") {
            alert("Media library permission is required.");
            return;
          }
          const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
          });
          if (!result.canceled) {
            console.log("Gallery photo URI:", result.assets[0].uri);
          }
        }
      }
    );
  };
  return (
    <View style={styles.container}>
      <ScanTitle />
      <ScanCard onPress={handleProceed} />
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
});
