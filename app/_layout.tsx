// app/_layout.tsx
import { Slot } from "expo-router";
import { AuthProvider } from "@/context/AuthContext";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";


export default function RootLayout() {
  return (
    <ActionSheetProvider>

    <AuthProvider>
      <Slot />
    </AuthProvider>
    </ActionSheetProvider>

  );
}
