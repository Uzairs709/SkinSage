import { useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const chats = [
  {
    id: "1",
    name: "Dr. Sarah Malik",
    image: "https://cdn-icons-png.flaticon.com/512/4140/4140051.png",
  },
  {
    id: "2",
    name: "Dr. Muhammad Uzair",
    image: "https://i.ibb.co/HD0P69zD/Muhammad-Uzair.jpg",
  },
  {
    id: "3",
    name: "Dr. Ayesha Raza",
    image: "https://cdn-icons-png.flaticon.com/512/4140/4140039.png",
  },
];

const ChatsScreen = () => {
  const router = useRouter();

  return (
    <FlatList
      data={chats}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.chatCard}
          onPress={() =>
            router.push({
              pathname: "/(patient)/messages",
              params: {
                name: item.name,
                image: item.image,
                id: item.id,
              },
            })
          }
        >
          <Image source={{ uri: item.image }} style={styles.avatar} />
          <View style={styles.textContainer}>
            <Text style={styles.name}>{item.name}</Text>
            {/* <Text style={styles.sub}>Medical Profile</Text> */}
          </View>
          <Image
            source={{
              uri: "https://img.icons8.com/ios-glyphs/30/4CAF50/speech-bubble--v1.png",
            }}
            style={styles.chatIcon}
          />
        </TouchableOpacity>
      )}
    />
  );
};

export default ChatsScreen;

const styles = StyleSheet.create({
  chatCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    justifyContent: "space-between",
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 25,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
  },
  sub: {
    fontSize: 12,
    color: "#4CAF50",
  },
  chatIcon: {
    width: 24,
    height: 24,
    tintColor: "#4CAF50",
  },
});
