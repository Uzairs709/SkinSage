// import { Feather } from '@expo/vector-icons';
// import React from 'react';
// import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// interface UserItemProps {
//   name: string;
//   onPress: () => void;
// }

// const UserItem: React.FC<UserItemProps> = ({ name, onPress }) => {
//   return (
//     <TouchableOpacity style={styles.container} onPress={onPress}>
//       <View style={styles.content}>
//         <Text style={styles.name}>{name}</Text>
//       </View>
//       <Feather name="message-circle" size={24} color="#3D6734" />
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     padding: 15,
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     marginVertical: 5,
//     marginHorizontal: 20,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//     elevation: 3,
//   },
//   content: {
//     flex: 1,
//   },
//   name: {
//     fontSize: 16,
//     fontWeight: '500',
//     color: '#000',
//   },
// });

// export default UserItem;

import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function UserItem({ name, profileType, imageUrl, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{ uri: imageUrl }} style={styles.avatar} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.type}>{profileType}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
  },
  type: {
    color: "#777",
    fontSize: 14,
  },
});
