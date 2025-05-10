// components/InputBar.tsx
import { Colors } from "@/constants/Colors";
import { Entypo, Ionicons } from "@expo/vector-icons";
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
  onPickImage: () => void;
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

  return (
    <View style={styles.inputContainer}>
      <TouchableOpacity onPress={onPickImage}>
        <Entypo name="image" size={24} color={Colors.dark.primary} />
      </TouchableOpacity>
      <TextInput
        style={styles.textInput}
        placeholder="Write your message"
        value={text}
        onChangeText={onTextChange}
        onSubmitEditing={handleSubmit}
        returnKeyType="send"
        blurOnSubmit={false}
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
