// components/InputBar.tsx
import { Entypo, Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface InputBarProps {
  text: string;
  onTextChange: (text: string) => void;
  onSend: () => void;
  onPickImage: () => void;
}

export default function InputBar({
  text,
  onTextChange,
  onSend,
  onPickImage,
}: InputBarProps) {
  return (
    <View style={styles.inputContainer}>
      <TouchableOpacity onPress={onPickImage}>
        <Entypo name="image" size={24} color="#3e663e" />
      </TouchableOpacity>
      <TextInput
        style={styles.textInput}
        placeholder="Write your message"
        value={text}
        onChangeText={onTextChange}
      />
      <TouchableOpacity onPress={onSend}>
        <Ionicons name="send" size={24} color="#3e663e" />
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
