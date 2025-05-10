import ChatItem from "@/components/ChatItem"; // Adjust the path if needed
import Ionicons from "@expo/vector-icons/build/Ionicons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface ChatUser {
  id: string;
  name: string;
  lastMessage: string;
  avatarUrl?: string;
}

export default function ChatList() {
  const router = useRouter();
  const [chatUsers, setChatUsers] = useState<ChatUser[]>([]);

  useEffect(() => {
    // Dummy data – replace with actual API call later
    setChatUsers([
      {
        id: "p001",
        name: "Ali Khan",
        lastMessage: "Sent an image for treatment",
        avatarUrl: "https://i.pravatar.cc/150?img=3",
      },
      {
        id: "p002",
        name: "Sara Malik",
        lastMessage: "Zoom Meet for Skin checkup tomorrow at 2PM",
        avatarUrl: "https://i.pravatar.cc/150?img=4",
      },
    ]);
  }, []);

  const handleOpenChat = (id: string, name: string, image: string) => {
    const user = chatUsers.find(u => u.id === id);
    router.push({
      pathname: "/(patient)/messages/[docId]",
      params: { docId: id, name: name, image: image },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#3e663e" />
        </TouchableOpacity>
        <Text style={styles.heading}>Chats</Text>
      </View>

      <FlatList
        data={chatUsers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ChatItem user={item} onPress={() => handleOpenChat(item.id, item.name, item.avatarUrl || "")} />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    marginTop: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 0,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 10,
    marginTop: 10,
  },
});
