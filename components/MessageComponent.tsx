// /components/MessageComponent.tsx
//abhi iska kam ni hy koi
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

type Message = {
  id: number;
  sender: "patient" | "doctor";
  text?: string;
  image?: string;
  image_ai_generated?: boolean;
  ai_analysis?: string;
};

type MessageProps = {
  message: Message;
  userType: "patient" | "doctor";
};

const MessageComponent: React.FC<MessageProps> = ({ message, userType }) => {
  const isPatient = userType === "patient";
  const isSenderPatient = message.sender === "patient";
  const showAI = message.image_ai_generated && !isPatient;

  const isOwnMessage =
    (isPatient && isSenderPatient) || (!isPatient && !isSenderPatient);

  return (
    <View
      style={[
        styles.bubble,
        isOwnMessage ? styles.patientBubble : styles.doctorBubble,
      ]}
    >
      {/* Show image if available */}
      {message.image && (
        <Image source={{ uri: message.image }} style={styles.msgImage} />
      )}

      {/* Show AI analysis only to doctors */}
      {showAI && message.ai_analysis && (
        <Text style={styles.msgText}>{message.ai_analysis}</Text>
      )}

      {/* Show normal text (skip AI-only for doctor) */}
      {message.text && (!message.image_ai_generated || isPatient) && (
        <Text style={styles.msgText}>{message.text}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  bubble: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 4,
    maxWidth: "80%",
  },
  patientBubble: {
    backgroundColor: "#e5e5e5",
    alignSelf: "flex-end",
  },
  doctorBubble: {
    backgroundColor: "#3e663e",
    alignSelf: "flex-start",
  },
  msgText: {
    color: "#fff",
    fontSize: 14,
  },
  msgImage: {
    width: 160,
    height: 160,
    borderRadius: 10,
    marginBottom: 6,
  },
});

export default MessageComponent;
