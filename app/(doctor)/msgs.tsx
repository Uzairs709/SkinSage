import DoctorChatHeader from "@/components/DoctorChatHeader";
import DoctorMessageInputBar from "@/components/DoctorMessageInputBar";
import FollowUpModal from "@/components/followUpModal";
import MessageBubble from "@/components/MessageBubble";
import PrescriptionModal from "@/components/PrescriptionModal";
import axios, { getChatHistory, Message, sendMessage } from "@/utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";

interface PrescriptionMedication {
  medicine: string;
  qty: number;
}

export default function Messages() {
  const flatListRef = useRef<FlatList>(null);
  const { patientId, patientName, patientImage } = useLocalSearchParams<{
    patientId: string;
    patientName: string;
    patientImage: string;
  }>();
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [followUpModalVisible, setFollowUpModalVisible] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const [prescriptions, setPrescriptions] = useState<PrescriptionMedication[]>([]);
  const [noteText, setNoteText] = useState("");
  const [doctorId, setDoctorId] = useState<number | null>(null);

  useEffect(() => {
    const fetchDoctorId = async () => {
      const userData = await AsyncStorage.getItem("user");
      if (userData) {
        const user = JSON.parse(userData);
        setDoctorId(user.id);
      }
    };
    fetchDoctorId();
  }, []);

  const fetchChatHistory = async () => {
    try {
      const userData = await AsyncStorage.getItem("user");
      if (!userData) return;
      const user = JSON.parse(userData);
      const history = await getChatHistory(parseInt(patientId), user.id);
      const formattedMessages: Message[] = history.map(msg => ({
        id: msg.id,
        sender: msg.sender_id === user.id ? "doctor" : "patient",
        content: msg.content,
        isImage: msg.is_image,
        isAI: msg.is_ai_generated,
      }));
      setMessages(formattedMessages);
    } catch (error) {
      console.error("Chat fetch error:", error);
    }
  };

  useEffect(() => {
    fetchChatHistory();
    const interval = setInterval(fetchChatHistory, 2000);
    return () => clearInterval(interval);
  }, [patientId]);

  const handleSend = async () => {
    if (!text) return;
    try {
      const userData = await AsyncStorage.getItem("user");
      if (!userData) return;
      const user = JSON.parse(userData);
      const response = await sendMessage({
        patient_id: parseInt(patientId),
        doctor_id: user.id,
        sender_id: user.id,
        content: text,
        is_image: false
      });
      setMessages(prev => [...prev, {
        id: response.message_id,
        sender: "doctor",
        text: text,
      }]);
      setText("");
    } catch (err) {
      console.error("Message send failed:", err);
    }
  };

  
  const openViewModal = async () => {
    try {
      const res = await axios.get("/prescriptions", {
        params: {
          doctor_id: doctorId,
          patient_id: parseInt(patientId),
        }
      });
  
      // res.data is PrescriptionResponse[]
      const arr = res.data as Array<{
        id: number;
        patient_id: number;
        doctor_id: number;
        prescription_date: string;
        medication: { medicine: string; qty: number }[];
        instructions?: string;
      }>;
  
      if (arr.length > 0) {
        // take the most recent (first) record
        const latest = arr[0];
        setPrescriptions(latest.medication);
        setNoteText(latest.instructions || "");
      } else {
        setPrescriptions([]);
        setNoteText("");
      }
      setViewModalVisible(true);
    } catch (err: any) {
      if (err.response?.status === 404) {
        setPrescriptions([]);
        setNoteText("");
        setViewModalVisible(true);
      } else {
        console.error("Failed to fetch prescription:", err);
      }
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <DoctorChatHeader
        image={patientImage}
        patientName={patientName}
        onViewPrescription={openViewModal}
        onAddFollowUp={() => setFollowUpModalVisible(true)}
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
      />

      <DoctorMessageInputBar
        text={text}
        onTextChange={setText}
        onSend={handleSend}
      />

      <PrescriptionModal
        visible={viewModalVisible}
        onClose={() => setViewModalVisible(false)}
        prescriptions={prescriptions}      // always an array now
        noteText={noteText}
        isViewOnly={false}
        doctorId={doctorId}
        patientId={parseInt(patientId)}
      />
      <FollowUpModal
        visible={followUpModalVisible}
        onClose={() => setFollowUpModalVisible(false)}
        doctorId={doctorId}
        patientId={parseInt(patientId)}
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
