import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./components/home";
import SignUp from "./components/signup";
import LogIn from "./components/login";
import Month from "./components/month";
import FriendsCheckbox from "./components/friendscheckbox";
import Settings from "./components/settings";
import AccountSettings from "./components/accountsettings";
import SearchFriends from "./components/searchfriends";
import {
  CalendarContext,
  Check,
  FilterFriendsContext,
  FriendsContext,
  PendingContext,
  CalendarDetails,
  CurrentUser,
} from "./components/context";

const Stack = createStackNavigator();

export default function App() {
  const [friends, setFriends] = useState([]);
  const [calendar, setCalendar] = useState({});
  const [filterFriends, setFilterFriends] = useState([]);
  const [checked, setChecked] = useState([]);
  const [pending, setPending] = useState([]);
  const [calendarDetails, setCalendarDetails] = useState({});
  const [user, setUser] = useState({});

  return (
    <CurrentUser.Provider value={[user, setUser]}>
      <FriendsContext.Provider value={[friends, setFriends]}>
        <PendingContext.Provider value={[pending, setPending]}>
          <CalendarContext.Provider value={[calendar, setCalendar]}>
            <CalendarDetails.Provider
              value={[calendarDetails, setCalendarDetails]}
            >
              <Check.Provider value={[checked, setChecked]}>
                <FilterFriendsContext.Provider
                  value={[filterFriends, setFilterFriends]}
                >
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
                </FilterFriendsContext.Provider>
              </Check.Provider>
            </CalendarDetails.Provider>
          </CalendarContext.Provider>
        </PendingContext.Provider>
      </FriendsContext.Provider>
    </CurrentUser.Provider>
  );
}
