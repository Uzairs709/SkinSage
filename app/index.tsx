// import React from "react";
// import { View, StyleSheet } from "react-native";
// import { NavigationContainer } from "@react-navigation/native";
// import {
//   createStackNavigator,
//   StackNavigationProp,
// } from "@react-navigation/stack";
// import SplashScreen from "@/app/(auth)/SplashScreen";
// import LoginScreen from "@/app/(auth)/LoginScreen";
// import SignupScreen from "@/app/(auth)/SignupScreen";
// import DoctorDashboard from "@/components/pages/DoctorDashboard";
// import ScanScreen from "@/components/pages/ScanScreen"; // Import ScanScreen
// import CameraScreen from "@/components/pages/CameraScreen"; // Import ScanScreen

// import { Colors } from "@/constants/Colors";
// type RootStackParamList = {
//   SplashScreen: undefined; // No parameters for SplashScreen
//   LoginScreen: undefined; // No parameters for LoginScreen
//   SignupScreen: undefined; // No parameters for LoginScreen
//   DoctorDashboard: undefined; // Add DoctorDashboard screen
//   ScanScreen: undefined; // Add ScanScreen type
//   CameraScreen: undefined; // Add ScanScreen type
// };

// const Stack = createStackNavigator<RootStackParamList>();

// const App: React.FC = () => {
//   return (
//     <View style={styles.container}>
//       <Stack.Navigator
//         screenOptions={{
//           headerShown: false,
//           headerTintColor: Colors.light.primary,
//         }}
//       >
//         <Stack.Screen name="SplashScreen" component={SplashScreen} />
//         <Stack.Screen name="LoginScreen" component={LoginScreen} />
//         <Stack.Screen name="SignupScreen" component={SignupScreen} />
//         <Stack.Screen name="DoctorDashboard" component={DoctorDashboard} />
//         <Stack.Screen name="ScanScreen" component={ScanScreen} />
//         <Stack.Screen name="CameraScreen" component={CameraScreen} />
//       </Stack.Navigator>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });

// export default App;
import { Redirect } from "expo-router";

export default function Index() {
  const isLoggedIn = false; // Replace with real auth logic
  return <Redirect href={isLoggedIn ? "/(tabs)/doctor_dashboard" : "/(auth)/splash"} />;
}