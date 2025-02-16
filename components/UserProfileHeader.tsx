import React from 'react';
import { View, Text, Image, StyleSheet, ImageBackground } from 'react-native';
import { useFonts } from 'expo-font';

type Props = {
  name: string;
  role: string;
  image: any; // React Native images use 'any' type
};

const UserProfileHeader: React.FC<Props> = ({ name, role, image }) => {
  // Load the custom font
  let [fontsLoaded] = useFonts({
    'Epilogue': require('../assets/fonts/Epilogue-VariableFont_wght.ttf'),
  });

  if (!fontsLoaded) {
    return <Text style={styles.loadingText}>Loading...</Text>;
  }

  return (
    <ImageBackground
      source={require('../assets/images/Green-Arc.png')} // Background image
      style={styles.headerContainer}
      imageStyle={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.avatar}>
        <Image source={require('../assets/images/Avatar Patient Male.png')} style={styles.image} resizeMode="contain" />
      </View>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.role}>{role}</Text>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 350,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    overflow: 'hidden',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginBottom: 10,
    marginTop:-20,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'Epilogue',
  },
  role: {
    fontSize: 12,
    color: '#fff',
    fontFamily: 'Epilogue',
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 50,
  },
});

export default UserProfileHeader;
