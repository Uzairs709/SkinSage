import { AuthProvider } from '@/context/AuthContext';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';

const RootLayout = () => {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ActionSheetProvider>
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="(auth)"
            // options={{ headerShown: false }}
          />
          <Stack.Screen
            name="(doctor)"
            // options={{ headerShown: false }}
          />
          <Stack.Screen
            name="(patient)"
            // options={{ headerShown: false }}
          />
        </Stack>
      </AuthProvider>
    </ActionSheetProvider>
  );
};

export default RootLayout;
