// /app/messages/[docId].tsx

import DoctorChatHeader from "@/components/DoctorChatHeader";
import DoctorMessageInputBar from "@/components/DoctorMessageInputBar";
import DoctorMessageList, { Message } from "@/components/DoctorMessageList";
import PrescriptionModal from "@/components/PrescriptionModal";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";

export default function Messages() {
  const { docId, patientName, patientImage } = useLocalSearchParams<{
    docId: string;
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

  const handleSend = () => {
    if (!text) return;

    const newMsg: Message = {
      id: Date.now(),
      sender: "doctor",
      text,
    };

    setMessages((prev) => [...prev, newMsg]);
    setText("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <DoctorChatHeader
        image={patientImage}
        patientName={patientName}
        onViewPrescription={() => setViewModalVisible(true)}
        onAddPrescription={() => setAddModalVisible(true)}
      />

      <DoctorMessageList messages={messages} />

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
