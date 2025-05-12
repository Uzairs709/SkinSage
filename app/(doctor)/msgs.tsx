// /app/messages/[docId].tsx

import DoctorChatHeader from "@/components/DoctorChatHeader";
import DoctorMessageInputBar from "@/components/DoctorMessageInputBar";
import MessageBubble from "@/components/MessageBubble";
import PrescriptionModal from "@/components/PrescriptionModal";
import { getChatHistory, Message, sendMessage } from "@/utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";

export default function Messages() {
  const flatListRef = useRef<FlatList>(null);
  const { patientId, patientName, patientImage } = useLocalSearchParams<{
    patientId: string;
    patientName: string;
    patientImage: string;
  }>();
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const [prescriptions] = useState([
    { medication: "Hydrocortisone cream", quantity: "1 tube" },
    { medication: "Antihistamine", quantity: "30 tablets" },
  ]);

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const userData = await AsyncStorage.getItem("user");
        if (!userData) {
          console.error("User not found");
          return;
        }

        const user = JSON.parse(userData);
        const history = await getChatHistory(parseInt(patientId), user.id);
        
        // Convert ChatMessage[] to Message[]
        const formattedMessages: Message[] = history.map(msg => ({
          id: msg.id,
          sender: msg.sender_id === user.id ? "doctor" : "patient",
          text: msg.content,
          image_ai_generated: msg.is_ai_generated,
        }));

        setMessages(formattedMessages);
      } catch (error) {
        console.error("Failed to fetch chat history:", error);
      }
    };

    // Initial fetch
    fetchChatHistory();
    
    // Set up polling
    const intervalId = setInterval(fetchChatHistory, 3000);

    // Cleanup
    return () => clearInterval(intervalId);
  }, [patientId]);

  const handleSend = async () => {
    if (!text) return;

    try {
      const textTOsend=text;
      setText("");
      const userData = await AsyncStorage.getItem("user");
      if (!userData) {
        console.error("User not found");
        return;
      }

      const user = JSON.parse(userData);
      const response = await sendMessage({
        patient_id: parseInt(patientId),
        doctor_id: user.id,
        sender_id: user.id,
        content: textTOsend
      });

      const newMsg: Message = {
        id: response.message_id,
        sender: "doctor",
        text:textTOsend,
      };

      setMessages((prev) => [...prev, newMsg]);
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const scrollToBottom = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <DoctorChatHeader
        image={patientImage}
        patientName={patientName}
        onViewPrescription={() => setViewModalVisible(true)}
        onAddPrescription={() => setAddModalVisible(true)}
      />

      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <MessageBubble message={item} userType="doctor" />
        )}
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
        onContentSizeChange={scrollToBottom}
        onLayout={scrollToBottom}
      />

      <DoctorMessageInputBar
        text={text}
        onTextChange={setText}
        onSend={handleSend}
      />

      <PrescriptionModal
        visible={viewModalVisible}
        onClose={() => setViewModalVisible(false)}
        prescriptions={prescriptions}
        noteText="Take with food and drink plenty of water."
        isViewOnly={true}
      />

      <PrescriptionModal
        visible={addModalVisible}
        onClose={() => setAddModalVisible(false)}
        prescriptions={prescriptions}
        noteText="Take with food and drink plenty of water."
        isViewOnly={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
    paddingBottom: 20,
  },
});
