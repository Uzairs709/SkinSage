import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";

import ChatHeader from "@/components/chatHeader";
import MessageBubble from "@/components/MessageBubble";
import InputBar from "@/components/MessageInputBar";
import PrescriptionModal from "@/components/PrescriptionModal";
import axios, { convertToJpegAsync, getChatHistory, Message, sendMessage } from "@/utils/api";

interface PrescriptionMedication {
    medicine: string;
    qty: number;
  }
  

export default function Messages() {
    const { docId, name, image } = useLocalSearchParams<{
        docId: string;
        name: string;
        image: string;
    }>();
    const [modalVisible, setModalVisible] = useState(false);
    const userType = "patient" as const;
    const [viewModalVisible, setViewModalVisible] = useState(false);
    const [patienId, setPatienId] = useState<number | null>(null);

    const [messages, setMessages] = useState<Message[]>([]);
    const [text, setText] = useState("");
    const [prescriptions, setPrescriptions] = useState<PrescriptionMedication[]>([]);
        
    const [noteText, setNoteText] = useState("");

    const flatListRef = useRef<FlatList>(null);

    useEffect(() => {
        const fetchPatientId = async () => {
          const userData = await AsyncStorage.getItem("user");
          if (userData) {
            const user = JSON.parse(userData);
            setPatienId(user.id);
          }
        };
        fetchPatientId();
      }, []);

    useEffect(() => {
        const fetchChatHistory = async () => {
            try {
                const userData = await AsyncStorage.getItem("user");
                if (!userData) {
                    console.error("User not found");
                    return;
                }

                const user = JSON.parse(userData);
                const history = await getChatHistory(user.id, parseInt(docId));

                // Convert ChatMessage[] to Message[]
                const formattedMessages: Message[] = history.map(msg => ({
                    id: msg.id,
                    sender: msg.sender_id === user.id ? "patient" : "doctor",
                    content: msg.content,
                    isImage: msg.is_image,
                    isAI: msg.is_ai_generated,
                }));

                setMessages(formattedMessages);
            } catch (error) {
                console.error("Failed to fetch chat history:", error);
            }
        };

        // Initial fetch
        fetchChatHistory();

        // Set up polling
        const intervalId = setInterval(fetchChatHistory, 2000);

        // Cleanup
        return () => clearInterval(intervalId);
    }, [docId]);

    const handleSend = async () => {
        if (!text) return;

        try {
            const textTOsend = text;
            setText("");
            const userData = await AsyncStorage.getItem("user");
            if (!userData) {
                console.error("User not found");
                return;
            }

            const user = JSON.parse(userData);
            const response = await sendMessage({
                patient_id: user.id,
                doctor_id: parseInt(docId),
                sender_id: user.id,
                content: textTOsend
            });

            const newMsg: Message = {
                id: response.message_id,
                sender: userType,
                text: textTOsend,
            };

            setMessages((prev) => [...prev, newMsg]);
        } catch (error) {
            console.error("Failed to send message:", error);
        }
    };

    const handleImagePick = async (imageUri: string) => {
        try {
          const userData = await AsyncStorage.getItem("user");
          if (!userData) return;
          const user = JSON.parse(userData);
    
          // convert any format to JPEG
          const jpegUri = await convertToJpegAsync(imageUri);
          const fileName = jpegUri.split("/").pop() || "photo.jpg";
          const fileType = "image/jpeg";
    
          const response = await sendMessage({
            patient_id: user.id,
            doctor_id: parseInt(docId),
            sender_id: user.id,
            is_image: true,
            file: { uri: jpegUri, name: fileName, type: fileType },
          });
    
          const newMsg: Message = {
            id: response.message_id,
            sender: userType,
            imageUri: jpegUri,
            is_image: true,
          };
    
          setMessages(prev => [...prev, newMsg]);
        } catch (error) {
          console.error("Failed to send image:", error);
        }
      };
    
    
    const scrollToBottom = () => {
        if (flatListRef.current) {
            flatListRef.current.scrollToEnd({ animated: true });
        }
    };
      const openViewModal = async () => {
        try {
          const res = await axios.get("/prescriptions", {
            params: {
              doctor_id: docId,
              patient_id: parseInt(patienId),
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
            <ChatHeader
                imageUrl={image}
                docName={name}
                onPressPrescription={openViewModal}
            />

            <FlatList
                ref={flatListRef}
                data={messages}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <MessageBubble message={item} userType={userType} />
                )}
                style={{ flex: 1 }}
                contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
                onContentSizeChange={scrollToBottom}
                onLayout={scrollToBottom}
            />

            <InputBar
                text={text}
                onTextChange={setText}
                onSend={handleSend}
                onPickImage={handleImagePick}
            />

            <PrescriptionModal
                visible={viewModalVisible}
                onClose={() => setViewModalVisible(false)}
                prescriptions={prescriptions}      // always an array now
                noteText={noteText}
                isViewOnly={true}
                doctorId={parseInt(docId)}
                patientId={parseInt(patienId)}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 23,
    },
});

