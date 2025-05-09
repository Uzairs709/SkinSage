import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";

import ChatHeader from "@/components/chatHeader";
import MessageBubble from "@/components/MessageBubble";
import InputBar from "@/components/MessageInputBar";
import PrescriptionModal from "@/components/PrescriptionModal";

type Message = {
    id: number;
    sender: "patient" | "doctor";
    text?: string;
    image?: string;
    image_ai_generated?: boolean;
    ai_analysis?: string;
};

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
    const [pickedImage, setPickedImage] = useState<string | null>(null);
    const [prescriptions] = useState([
        { medication: "Hydrocortisone cream", quantity: "1 tube" },
        { medication: "Antihistamine", quantity: "30 tablets" },
    ]);
    const noteText = "Take with food and drink plenty of water.";


    const handleSend = () => {
        if (!text && !pickedImage) return;

        const newMsg: Message = {
            id: Date.now(),
            sender: userType,
            text,
            image: pickedImage ?? undefined,
        };

        setMessages((prev) => [...prev, newMsg]);
        setText("");
        setPickedImage(null);

        if (userType === "patient" && pickedImage) {
            setTimeout(() => {
                setMessages((prev) => [
                    ...prev,
                    {
                        id: Date.now() + 1,
                        sender: "doctor",
                        image_ai_generated: true,
                        ai_analysis: "AI Analysis:\n1. Warts 70%\n2. Acne 20%\n3. Eczema 10%",
                    },
                    {
                        id: Date.now() + 2,
                        sender: "doctor",
                        text: "Based on the image, I've prescribed medicines. Please check your profile.",
                    },
                ]);
            }, 1000);
        }
    };

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });

        if (!result.canceled && result.assets.length > 0) {
            setPickedImage(result.assets[0].uri);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ChatHeader
                image={image}
                patientName={name}
                onPressPrescription={() => setModalVisible(true)}
            />

            <FlatList
                data={messages}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <MessageBubble message={item} userType={userType} />
                )}
                style={{ flex: 1 }}
                contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
            />

            <InputBar
                text={text}
                onTextChange={setText}
                onSend={handleSend}
                onPickImage={pickImage}
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
