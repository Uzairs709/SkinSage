import React from "react";
import { View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack";
import SplashScreen from "@/components/pages/splashScreen";
import LoginScreen from "@/components/pages/LoginScreen";
import SignupScreen from "@/components/pages/SignupScreen";
import { Colors } from "@/constants/Colors";
type RootStackParamList = {
  SplashScreen: undefined; // No parameters for SplashScreen
  LoginScreen: undefined;  // No parameters for LoginScreen
  SignupScreen: undefined;  // No parameters for LoginScreen
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <View style={styles.container}>
      <Stack.Navigator screenOptions={{headerShown: false, headerTintColor:Colors.light.primary}}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
      </Stack.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;