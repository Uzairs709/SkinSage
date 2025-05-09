// /app/messages/[docId].tsx

import PrescriptionModal from "@/components/PrescriptionModal";
import { Entypo, Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Message = {
  id: number;
  sender: "patient" | "doctor";
  text?: string;
  image?: string;
  image_ai_generated?: boolean;
  ai_analysis?: string;
};

export default function Messages() {
  const { docId, patientName, patientImage } = useLocalSearchParams<{
    docId: string;
    patientName: string;
    patientImage: string;
  }>();
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const userType = "doctor" as "doctor" | "patient";

  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const [pickedImage, setPickedImage] = useState<string | null>(null);
  const [prescriptions] = useState([
    { medication: "Hydrocortisone cream", quantity: "1 tube" },
    { medication: "Antihistamine", quantity: "30 tablets" },
  ]);

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

  const renderItem = ({ item }: { item: Message }) => {
    const isPatient = userType === "patient";
    const isSenderPatient = item.sender === "patient";
    const showAI = item.image_ai_generated && !isPatient;

    const isOwnMessage =
      (isPatient && isSenderPatient) || (!isPatient && !isSenderPatient);

    return (
      <View
        style={[
          styles.bubble,
          isOwnMessage ? styles.patientBubble : styles.doctorBubble,
        ]}
      >
        {item.image && (
          <Image source={{ uri: item.image }} style={styles.msgImage} />
        )}

        {showAI && item.ai_analysis && (
          <Text style={styles.msgText}>{item.ai_analysis}</Text>
        )}

        {item.text && (!item.image_ai_generated || isPatient) && (
          <Text style={styles.msgText}>{item.text}</Text>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: patientImage }} style={styles.profileImage} />
        <View style={styles.nameStatusContainer}>
          <Text style={styles.patientName}>{patientName}</Text>
          <Text style={styles.onlineStatus}>● Online</Text>
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Ionicons name="medkit" size={20} color="#3e663e" />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
      />

      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={pickImage}>
          <Entypo name="image" size={24} color="#3e663e" />
        </TouchableOpacity>
        <TextInput
          style={styles.textInput}
          placeholder="Write your message"
          value={text}
          onChangeText={setText}
        />
        <TouchableOpacity onPress={handleSend}>
          <Ionicons name="send" size={24} color="#3e663e" />
        </TouchableOpacity>
      </View>
      <PrescriptionModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        prescriptions={prescriptions}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
  },
  nameStatusContainer: {
    flexDirection: "column",
    justifyContent: "center",
  },
  //   docName: {
  //     fontSize: 16,
  //     fontWeight: "bold",
  //     color: "#2d2d2d",
  //     marginBottom: 2,
  //   },
  onlineStatus: {
    color: "green",
    fontSize: 12,
    marginTop: 2,
  },
  patientName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2d2d2d",
    marginBottom: 2,
  },
  profileImage: {
    width: 42,
    height: 42,
    borderRadius: 21,
    marginRight: 12,
  },
  headerIcons: {
    marginLeft: "auto",
    flexDirection: "row",
    alignItems: "center",
  },
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
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 0.5,
    borderColor: "#ccc",
  },
  textInput: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginHorizontal: 10,
  },
});
