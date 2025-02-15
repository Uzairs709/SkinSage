import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ResultsScreen from "./resultsScreen"

const Stack = createStackNavigator();

export default function resultApp() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Results" component={ResultsScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
