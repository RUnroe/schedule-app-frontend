import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./components/home";
import SignUp from "./components/signup";
import LogIn from "./components/login";
import Month from "./components/month";
import Daily from "./components/daily";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="Waffle"
          component={Home}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen
          name="Sign Up"
          component={SignUp}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen
          name="Log In"
          component={LogIn}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen
          name="Month"
          component={Month}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen
          name="Daily"
          component={Daily}
          options={{ gestureEnabled: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
