// components/InputBar.tsx
import { Colors } from "@/constants/Colors";
import { Entypo, Ionicons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import React from "react";
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputSubmitEditingEventData,
  TouchableOpacity,
  View,
} from "react-native";

interface InputBarProps {
  text: string;
  onTextChange: (text: string) => void;
  onSend: () => void;
  onPickImage: (imageUri: string) => void;
}

export default function InputBar({
  text,
  onTextChange,
  onSend,
  onPickImage,
}: InputBarProps) {
  const handleSubmit = (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
    if (text.trim()) {
      onSend();
    }
  };

  const handleImagePick = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets[0].uri) {
      onPickImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.inputContainer}>
      <TouchableOpacity onPress={handleImagePick}>
        <Entypo name="image" size={24} color={Colors.dark.primary} />
      </TouchableOpacity>
      <TextInput
        style={styles.textInput}
        placeholder="Write your message"
        value={text}
        onChangeText={onTextChange}
        onSubmitEditing={handleSubmit}
        returnKeyType="send"
      />
      <TouchableOpacity onPress={onSend}>
        <Ionicons name="send" size={24} color={Colors.dark.primary} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderTopWidth: 0.5,
    borderColor: "#ccc",
    marginBottom: 15,
  },
  textInput: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginHorizontal: 10,
  },
});
