import { useFonts } from 'expo-font'; // Import the useFonts hook
import React from 'react';
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import LogoutButton from './LogoutButton';

interface ProfileHeaderProps {
  name: string;
  profession?: string | null;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ name, profession }) => {
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
      <View style={styles.headerTop}>
        <View style={styles.headerContent} />
        <LogoutButton />
      </View>
      <View style={styles.profileContent}>
        <View style={styles.avatar}>
          <Image
            source={require('../assets/images/Avatar-Doc-Male.png')} // Replace with the doctor avatar URL
            style={styles.image}
          />
        </View>
        <Text style={styles.name}>{name}</Text>
        {profession && <Text style={styles.profession}>{profession}</Text>}
      </View>
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
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  headerContent: {
    flex: 1,
  },
  profileContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
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
