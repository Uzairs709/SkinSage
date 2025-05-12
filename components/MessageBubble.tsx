// // components/MessageBubble.tsx
// import React from "react";
// import { Image, StyleSheet, Text, View } from "react-native";

// type Message = {
//   id: number;
//   sender: "patient" | "doctor";
//   text?: string;
//   image?: string;
//   image_ai_generated?: boolean;
//   ai_analysis?: string;
// };

// interface MessageBubbleProps {
//   message: Message;
//   userType: "patient" | "doctor";
// }

// export default function MessageBubble({ message, userType }: MessageBubbleProps) {
//   const isPatient = userType === "patient";
//   const isSenderPatient = message.sender === "patient";
//   const showAI = message.image_ai_generated && !isPatient;
//   const isOwnMessage =
//     (isPatient && isSenderPatient) || (!isPatient && !isSenderPatient);

//   if (message.image) {
//     console.log('Message image URI:', message.image);
//   }

//   return (
//     <View
//       style={[
//         styles.bubble,
//         isOwnMessage ? styles.patientBubble : styles.doctorBubble,
//       ]}
//     >
//       {message.image && (
//         <Image source={{ uri: "https://via.placeholder.com/150" }} style={styles.msgImage} />
//       )}

//       {showAI && message.ai_analysis && (
//         <Text style={styles.msgText}>{message.ai_analysis}</Text>
//       )}

//       {message.text && (!message.image_ai_generated || isPatient) && (
//         <Text style={styles.msgText}>{message.text}</Text>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   bubble: {
//     padding: 10,
//     borderRadius: 10,
//     marginVertical: 4,
//     maxWidth: "80%",
//   },
//   patientBubble: {
//     backgroundColor: "#3D5467",
//     alignSelf: "flex-end",
//   },
//   doctorBubble: {
//     backgroundColor: "#3e663e",
//     alignSelf: "flex-start",
//   },
//   msgText: {
//     color: "#fff",
//     fontSize: 14,
//   },
//   msgImage: {
//     width: 160,
//     height: 160,
//     borderRadius: 10,
//     marginBottom: 6,
//   },
// });



import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Message = {
  id: number;
  sender: "patient" | "doctor";
  text?: string;
  image_ai_generated?: boolean;
  ai_analysis?: string;
};

interface MessageBubbleProps {
  message: Message;
  userType: "patient" | "doctor";
}

export default function MessageBubble({ message, userType }: MessageBubbleProps) {
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
      {showAI && message.ai_analysis && (
        <Text style={styles.msgText}>{message.ai_analysis}</Text>
      )}

      {message.text && (!message.image_ai_generated || isPatient) && (
        <Text style={styles.msgText}>{message.text}</Text>
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
});

