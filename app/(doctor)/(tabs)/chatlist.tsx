import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
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
    // Replace with real API fetch
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

  const handleOpenChat = (id: string) => {
    router.push({
      pathname: "/(doctor)/msgs",
      params: { patientId: id },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Chats</Text>
      <FlatList
        data={chatUsers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.chatItem}
            onPress={() => handleOpenChat(item.id)}
          >
            <Image source={{ uri: item.avatarUrl }} style={styles.avatar} />
            <View>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.message}>{item.lastMessage}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  heading: { fontSize: 22, fontWeight: "bold", marginBottom: 16 },
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 12 },
  name: { fontSize: 16, fontWeight: "600" },
  message: { fontSize: 14, color: "#666" },
});
