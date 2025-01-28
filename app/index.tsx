import React from "react";
import { View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "@/components/pages/splashScreen";
import LoginScreen from "@/components/pages/LoginScreen";
import SignupScreen from "@/components/pages/SignupScreen";

const Stack = createStackNavigator();

const App: React.FC = () => {
  const [showSplash, setShowSplash] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: "white" },
        }}
      >
        {showSplash ? (
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
        ) : (
          // <Stack.Screen name="LoginScreen" component={LoginScreen} />

          <Stack.Screen name="SignupScreen" component={SignupScreen} />
        )}
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
