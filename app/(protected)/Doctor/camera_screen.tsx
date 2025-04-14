import React, { useState } from "react";
import { View, Button, Image, StyleSheet } from "react-native";
import { launchCamera, launchImageLibrary, Asset } from "react-native-image-picker";

export default function SameraScreen() {
  const [photo, setPhoto] = useState<string | null>(null);

  const openCamera = async () => {
    const result = await launchCamera({
      mediaType: "photo",
      cameraType: "back",
      includeBase64: false,
      saveToPhotos: true,
    });

    if (result.assets && !result.didCancel) {
      const uri = result.assets[0]?.uri;
      if (uri) setPhoto(uri);
    }
  };

  const openGallery = async () => {
    const result = await launchImageLibrary({
      mediaType: "photo",
      selectionLimit: 1,
    });

    if (result.assets && !result.didCancel) {
      const uri = result.assets[0]?.uri;
      if (uri) setPhoto(uri);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Open Camera" onPress={openCamera} />
      <View style={{ height: 10 }} />
      <Button title="Pick from Gallery" onPress={openGallery} />
      {photo && <Image source={{ uri: photo }} style={styles.image} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  image: {
    width: 300,
    height: 400,
    marginTop: 20,
    borderRadius: 10,
  },
});
