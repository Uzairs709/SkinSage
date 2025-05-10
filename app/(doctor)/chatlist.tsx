// ChatList.tsx
import Ionicons from "@expo/vector-icons/build/Ionicons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import ChatItem from "@/components/ChatItem";

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
    // Replace with your real API call
    setChatUsers([
      { id: "p001", name: "Ali Khan", lastMessage: "Sent an image for treatment", avatarUrl: "https://i.pravatar.cc/150?img=3" },
      { id: "p002", name: "Sara Malik", lastMessage: "Zoom Meet for Skin checkup tomorrow at 2PM", avatarUrl: "https://i.pravatar.cc/150?img=4" },
    ]);
  }, []);

  const handleOpenChat = (id: string) => {
    const user = chatUsers.find(u => u.id === id);
    router.push({
      pathname: "/(doctor)/msgs",
      params: { patientId: id, patientName: user?.name },
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
        showsVerticalScrollIndicator={false}
        data={chatUsers}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ChatItem
            user={item}
            onPress={() => handleOpenChat(item.id)}
          />
        )}
        contentContainerStyle={styles.container}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16, marginTop: 20 },
  heading: { fontSize: 22, fontWeight: "bold", marginLeft: 10, marginTop: 10 },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 0 },
});
