import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

interface UserItemProps {
  name: string;
  profileType: string;
  imageUrl: string;
}

const UserItem: React.FC<UserItemProps> = ({ name, profileType, imageUrl }) => {
  const router = useRouter();

  return (
    <TouchableOpacity style={styles.container} onPress={() => router.push("/")}>
      {/* Profile Image */}
      <Image source={{ uri: imageUrl }} style={styles.avatar} />

      {/* User Info */}
      <View style={styles.textContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.profileType}>{profileType}</Text>
      </View>

      {/* Chat Icon */}
      <TouchableOpacity onPress={() => router.push("/")}>
        <Image source={require("../assets/images/chat-icon.png")} style={styles.chatIcon} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 40,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  profileType: {
    fontSize: 14,
    color: "green",
  },
  chatIcon: {
    width: 24,
    height: 24,
    tintColor: "green",
  },
});

export default UserItem;
