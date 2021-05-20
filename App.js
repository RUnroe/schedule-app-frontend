import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./components/home";
import SignUp from "./components/signup";
import LogIn from "./components/login";
import Month from "./components/month";
import Daily from "./components/daily";
import FriendsCheckbox from "./components/friendscheckbox";
import Settings from "./components/settings";
import AccountSettings from "./components/accountsettings";
import SearchFriends from "./components/searchfriends";
import { CalendarContext, FriendsContext } from "./components/context";

const Stack = createStackNavigator();

export default function App() {
  const [friends, setFriends] = useState([]);
  const [calendar, setCalendar] = useState([]);

  useEffect(() => {
    fetch("https://waffle.jtreed.org/api/v0/friends")
      .then((res) => res.json())
      .then((data) => {
        setFriends(data);
      });
  }, []);

  useEffect(() => {
    fetch("https://waffle.jtreed.org/api/v0/calendars")
      .then((res) => res.json())
      .then((data) => {
        setCalendar(data);
      });
  }, []);

  return (
    <FriendsContext.Provider value={[friends, setFriends]}>
      <CalendarContext.Provider value={[calendar, setCalendar]}>
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
            <Stack.Screen
              name="Friends Checkbox"
              component={FriendsCheckbox}
              options={{ gestureEnabled: false }}
            />
            <Stack.Screen
              name="Settings"
              component={Settings}
              options={{ gestureEnabled: false }}
            />
            <Stack.Screen
              name="Account Settings"
              component={AccountSettings}
              options={{ gestureEnabled: false }}
            />
            <Stack.Screen
              name="Search Friends"
              component={SearchFriends}
              options={{ gestureEnabled: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </CalendarContext.Provider>
    </FriendsContext.Provider>
  );
}
