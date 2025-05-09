import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ChatUser {
  id: string;
  name: string;
  lastMessage: string;
  avatarUrl?: string;
}

export default function ChatItem({
  user,
  onPress,
}: {
  user: ChatUser;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.chatItem} onPress={onPress}>
      <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
      <View style={styles.messageContainer}>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.message} numberOfLines={1} ellipsizeMode="tail">
          {user.lastMessage}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  messageContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
  },
  message: {
    fontSize: 14,
    color: "#666",
  },
});
