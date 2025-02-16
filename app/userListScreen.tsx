import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import UserItem from "../components/UserItem";

const users = [
  { id: "1", name: "M Khizar Imran", profileType: "Medical Profile", imageUrl: "https://randomuser.me/api/portraits/men/1.jpg" },
  { id: "2", name: "John Doe", profileType: "Medical Profile", imageUrl: "https://randomuser.me/api/portraits/men/2.jpg" },
  { id: "3", name: "Jane Smith", profileType: "Medical Profile", imageUrl: "https://randomuser.me/api/portraits/women/3.jpg" },
  { id: "1", name: "M Khizar Imran", profileType: "Medical Profile", imageUrl: "https://randomuser.me/api/portraits/men/1.jpg" },
  { id: "2", name: "John Doe", profileType: "Medical Profile", imageUrl: "https://randomuser.me/api/portraits/men/2.jpg" },
  { id: "3", name: "Jane Smith", profileType: "Medical Profile", imageUrl: "https://randomuser.me/api/portraits/women/3.jpg" },
  // Add more users here
];

export default function UserListScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <UserItem name={item.name} profileType={item.profileType} imageUrl={item.imageUrl} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
