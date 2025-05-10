import React from "react";
import { FlatList, StyleSheet } from "react-native";
import MessageBubble from "./MessageBubble";

export interface Message {
  id: number;
  sender: "patient" | "doctor";
  text?: string;
  image?: string;
  image_ai_generated?: boolean;
  ai_analysis?: string;
}

interface DoctorMessageListProps {
  messages: Message[];
}

export default function DoctorMessageList({ messages }: DoctorMessageListProps) {
  return (
    <FlatList
      data={messages}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <MessageBubble message={item} userType="doctor" />
      )}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
}); 