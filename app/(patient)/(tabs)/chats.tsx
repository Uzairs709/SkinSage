import ChatItem from "@/components/ChatItem";
import { Conversation, getPatientConversations } from "@/utils/api";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ChatList() {
  const router = useRouter();
  const [chatUsers, setChatUsers] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const userData = await AsyncStorage.getItem("user");
        if (!userData) {
          setError("User not found");
          return;
        }
        
        const user = JSON.parse(userData);
        const conversations = await getPatientConversations(user.id);
        setChatUsers(conversations);
      } catch (err) {
        setError("Failed to load conversations");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, []);

  const handleOpenChat = (id: number, name: string, image: string) => {
    router.push({
      pathname: "/(patient)/messages/[docId]",
      params: { docId: id.toString(), name: name, image: image },
    });
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#3e663e" />
          </TouchableOpacity>
          <Text style={styles.heading}>Chats</Text>
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3e663e" />
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#3e663e" />
          </TouchableOpacity>
          <Text style={styles.heading}>Chats</Text>
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </SafeAreaView>
    );
  }

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
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ChatItem 
            user={item} 
            onPress={() => handleOpenChat(item.id, item.name, item.imageUrl)} 
          />
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
});
