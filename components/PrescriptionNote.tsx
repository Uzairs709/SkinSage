import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

interface PrescriptionNoteProps {
  noteText: string;
  isEditing: boolean;
  onNoteChange: (text: string) => void;
}

export default function PrescriptionNote({
  noteText,
  isEditing,
  onNoteChange,
}: PrescriptionNoteProps) {
  return (
    <View>
      <Text style={styles.noteTitle}>Note</Text>
      {isEditing ? (
        <TextInput
          style={styles.noteInput}
          value={noteText}
          onChangeText={onNoteChange}
          multiline
          placeholder="Enter prescription notes"
        />
      ) : (
        <Text style={styles.noteText}>{noteText}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  noteTitle: {
    marginTop: 16,
    fontWeight: "bold",
    fontSize: 16,
    color: "#fff",
  },
  noteText: {
    color: "#fff",
    fontSize: 14,
    marginTop: 6,
    lineHeight: 18,
  },
  noteInput: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 10,
    color: Colors.dark.primary,
    fontSize: 14,
    minHeight: 80,
    marginTop: 6,
  },
}); 