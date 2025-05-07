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
  const { docId, name, image } = useLocalSearchParams<{
    docId: string;
    name: string;
    image: string;
  }>();
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);

  // Simulated user type; change to "patient" to test patient view
  const userType: "doctor" | "patient" = "doctor";

  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const [pickedImage, setPickedImage] = useState<string | null>(null);

  const handleSend = () => {
    if (!text && !pickedImage) return;

    const newMsg: Message = {
      id: Date.now(),
      sender: "patient",
      text,
      image: pickedImage ?? undefined,
    };

    setMessages((prev) => [...prev, newMsg]);
    setText("");
    setPickedImage(null);

    // Simulated doctor response
    setTimeout(() => {
      const aiResults =
        "AI Analysis:\n1. Eczema 71%\n2. Acne 31%\n3. Melasma 13%";
      const prescription =
        "I have prescribed medicines based on your condition. Kindly check your profile.";

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "doctor",
          image_ai_generated: true,
          ai_analysis: aiResults,
          text: userType === "doctor" ? aiResults : undefined,
        },
        {
          id: Date.now() + 2,
          sender: "doctor",
          text: prescription,
        },
      ]);
    }, 1000);
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

  const renderItem = ({ item }: { item: Message }) => (
    <View
      style={[
        styles.bubble,
        item.sender === "patient" ? styles.patientBubble : styles.doctorBubble,
      ]}
    >
      {item.image && (
        <Image source={{ uri: item.image }} style={styles.msgImage} />
      )}

      {item.image_ai_generated && userType === "doctor" && item.ai_analysis && (
        <Text style={styles.msgText}>{item.ai_analysis}</Text>
      )}

      {item.text && (!item.image_ai_generated || userType === "patient") && (
        <Text style={styles.msgText}>{item.text}</Text>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={{ uri: image }} style={styles.profileImage} />
        <View style={styles.nameStatusContainer}>
          <Text style={styles.docName}>{name}</Text>
          <Text style={styles.onlineStatus}>● Online</Text>
        </View>

        <View style={styles.headerIcons}>
          {/* <TouchableOpacity
            onPress={() => router.push(`/doctor-profile/${docId}`)}
          >
            <Entypo
              name="cycle"
              size={20}
              color="#3e663e"
              style={{ marginRight: 12 }}
            />
          </TouchableOpacity> */}
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Ionicons name="medkit" size={20} color="#3e663e" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Chat List */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
      />

      {/* Input Area */}
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
  docName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2d2d2d",
    marginBottom: 2,
  },
  onlineStatus: {
    color: "green",
    fontSize: 12,
    marginTop: 2,
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
