import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";

import ChatHeader from "@/components/chatHeader";
import MessageBubble from "@/components/MessageBubble";
import InputBar from "@/components/MessageInputBar";
import PrescriptionModal from "@/components/PrescriptionModal";
import { getChatHistory, Message, sendMessage } from "@/utils/api";

export default function Messages() {
    const { docId, name, image } = useLocalSearchParams<{
        docId: string;
        name: string;
        image: string;
    }>();
    const [modalVisible, setModalVisible] = useState(false);
    const userType = "patient" as const;

    const [messages, setMessages] = useState<Message[]>([]);
    const [text, setText] = useState("");
    const [prescriptions] = useState([
        { medication: "Hydrocortisone cream", quantity: "1 tube" },
        { medication: "Antihistamine", quantity: "30 tablets" },
    ]);
    const noteText = "Take with food and drink plenty of water.";

    const flatListRef = useRef<FlatList>(null);

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
    }, [docId]);

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

    const scrollToBottom = () => {
        if (flatListRef.current) {
            flatListRef.current.scrollToEnd({ animated: true });
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ChatHeader
                imageUrl={image}
                docName={name}
                onPressPrescription={() => setModalVisible(true)}
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
                onPickImage={() => {}}
            />

            <PrescriptionModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                prescriptions={prescriptions}
                noteText={noteText}
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

