import React from 'react';
import { View, Text, Image, StyleSheet, ImageBackground } from 'react-native';
import { useFonts } from 'expo-font'; // Import the useFonts hook

const ProfileHeader = () => {
  // Load the font using the useFonts hook
  let [fontsLoaded] = useFonts({
    'Epilogue': require('../assets/fonts/Epilogue-VariableFont_wght.ttf'), // Load your custom font
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>; // Show loading text while the font is being loaded
  }

  return (
    <ImageBackground
      source={require('../assets/images/Green-Arc.png')} // Path to your background image
      style={styles.headerContainer}
      imageStyle={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.avatar}>
        <Image
          source={require('../assets/images/Avatar-Doc-Male.png')} // Replace with the doctor avatar URL
          style={styles.image}
        />
      </View>
      <Text style={styles.name}>Dr Arslan</Text>
      <Text style={styles.profession}>Dermatologist</Text>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 400,
    flex: 1, // Ensures the container takes up the full available space
    justifyContent: 'center', // Centers the content vertically
    alignItems: 'center', // Centers the content horizontally
    paddingVertical: 20, // Adds padding to the top and bottom
    overflow: 'hidden', // Ensures the content stays within the rounded corners
  },
  backgroundImage: {
    flex: 1, // Ensures the image fills the header container
    width: '100%', // Ensures the image covers the full width of the container
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
  },
  image: {
    width: '100%',
    height: '100%',
  },
  name: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'Epilogue', // Apply the custom font
  },
  profession: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'Epilogue',
  },
});

export default ProfileHeader;
