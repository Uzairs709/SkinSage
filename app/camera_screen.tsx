import { router } from "expo-router";
import React, { useState } from "react";
import { View, Button, Image, StyleSheet } from "react-native";
import { launchCamera } from "react-native-image-picker";

export default function samera_screen (){
  const [photo, setPhoto] = useState(null);

  const openCamera = async () => {
    {/*const result = await launchCamera({
      mediaType: "photo",
      cameraType: "back",
    });
    if (!result.didCancel && result.assets) {
      setPhoto(result.assets[0].uri);
    }*/}
    router.navigate("/resultApp")
  };

  return (
    <View style={styles.container}>
      <Button title="Open Camera" onPress={openCamera} />
      {photo && <Image source={{ uri: photo }} style={styles.image} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 300,
    height: 400,
    marginTop: 20,
  },
});

