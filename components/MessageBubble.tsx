import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

type Message = {
  id: number;
  sender: "patient" | "doctor";
  content: string;           // image URI or text/JSON
  isImage: boolean;
  isAI: boolean;
};

interface MessageBubbleProps {
  message: Message;
  userType: "patient" | "doctor";
}

export default function MessageBubble({ message, userType }: MessageBubbleProps) {
  const isPatientView = userType === "patient";
  const isOwnMessage =
    (message.sender === "patient" && !isPatientView) ||
    (message.sender === "doctor" && isPatientView) === false;

  // Hide AI-generated content from patients
  if (message.isAI && isPatientView) return null;

  // Format AI JSON string into lines: "rank. class: chance%"
  const renderAIContent = (jsonString: string) => {
    try {
      const { predictions } = JSON.parse(jsonString);
      if (Array.isArray(predictions)) {
        return predictions
          .map(
            (pred: any) =>
              `${pred.rank}. ${pred.class}: ${pred.chance_percentage.toFixed(1)}%`
          )
          .join("\n");
      }
    } catch {
      // Fallback to raw text if parsing fails
    }
    return jsonString;
  };

  const bubbleStyles = [
    styles.bubble,
    message.sender === userType ? styles.patientBubble : styles.doctorBubble,
  ];

  return (
    <View style={bubbleStyles}>
      {message.isImage ? (
        <Image source={{ uri: message.content }} style={styles.msgImage} />
      ) : message.isAI ? (
        <Text style={styles.msgText}>
          {renderAIContent(message.content)}
        </Text>
      ) : (
        <Text style={styles.msgText}>{message.content}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  bubble: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 4,
    maxWidth: "80%",
  },
  patientBubble: {
    backgroundColor: "#3D5467",
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