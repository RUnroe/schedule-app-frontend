import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import {
  useFonts,
  Itim_400Regular,
  ReemKufi_400Regular,
} from "@expo-google-fonts/dev";
import CalendarPicker from "react-native-calendar-picker";
import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import {
  CalendarContext,
  CalendarDetails,
  Check,
  FilterFriendsContext,
  FriendsContext,
  PendingContext,
  CurrentUser,
} from "./context";

export default function Month({ navigation }) {
  const [filterFriends] = useContext(FilterFriendsContext);
  const [calendar, setCalendar] = useContext(CalendarContext);
  const [pending, setPending] = useContext(PendingContext);
  const [friends, setFriends] = useContext(FriendsContext);
  const [calendarDetails, setCalendarDetails] = useContext(CalendarDetails);
  const [checked, setChecked] = useContext(Check);
  const [user, setUser] = useContext(CurrentUser);
  const [color] = useState(["#ffc552", "#ecbfff", "#a4f5a8", "#c2c4ff"]);
  const [current, setCurrent] = useState(() => {
    let date = new Date();
    let year = date.getFullYear().toString().padStart(2, "0");
    let month = date.getMonth() + 1;
    let realMonth = month.toString().padStart(2, "0");
    let day = date.getDate().toString().padStart(2, "0");
    let currentDate = `${year}-${realMonth}-${day}`;
    return currentDate;
  });

  useEffect(() => {
    fetch("https://waffle.jtreed.org/api/v1/friends/current", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setFriends(Object.values(data));
        setChecked(() => {
          let list = [];
          Object.keys(data).forEach(() => {
            list.push(false);
          });
          return list;
        });
      });
  }, []);

  useEffect(() => {
    fetch("https://waffle.jtreed.org/api/v1/friends/pending", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setPending(Object.values(data));
      });
  }, []);

  useEffect(() => {
    fetch("https://waffle.jtreed.org/api/v1/calendars/details", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setCalendarDetails(Object.values(data));
      });
  }, []);

  useEffect(() => {
    fetch("https://waffle.jtreed.org/api/v1/calendars/details", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setCalendar(data));
  }, []);

  let [fontsLoaded] = useFonts({
    Itim_400Regular,
    ReemKufi_400Regular,
  });

  const checkEvents = (isoDate) => {
    let styl = { containerStyle: styles.normalDay };
    let changed = false;
    if (filterFriends && calendar > 0) {
      filterFriends.map((friend, index) => {
        calendar[friend.user_id].map((evt) => {
          let event = evt.start.toString().split("T");
          if (isoDate === event[0]) {
            if (!changed) {
              changed = true;
              styl = {
                style: styles.monthDayEvent,
              };
            }
          }
        });
      });
    }
    if (calendar[user.user_id] > 0) {
      calendar[user.user_id].map((evt) => {
        let event = evt.start.toString().split("T");
        if (isoDate === event[0]) {
          if (!changed) {
            changed = true;
            styl = {
              style: styles.monthDayEvent,
            };
          }
        }
      });
    }
    return styl;
  };

  const todaysEvents = () => {
    let bool = false;
    if (filterFriends && calendar > 0) {
      filterFriends.map((friend, index) => {
        calendar[friend.user_id].map((evt, i) => {
          let event = evt.start.toString().split("T");

          if (current === event[0].toString()) {
            bool = true;
          }
        });
      });
    }

    return bool;
  };

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  } else {
    return (
      <View style={styles.container}>
        <View style={{ height: 70, backgroundColor: "#B58E78" }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Account Settings")}
          >
            <View style={styles.profile}>
              <View style={styles.profileSection}>
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: "ReemKufi_400Regular",
                    color: "#4F2717",
                  }}
                >
                  {user.first_name} {user.last_name}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <CalendarPicker
            customDatesStyles={(date) => {
              let newDate = new Date(date.toString()).toISOString().split("T");
              return checkEvents(newDate[0]);
            }}
            textStyle={{
              color: "#4F2717",
              fontFamily: "ReemKufi_400Regular",
              fontSize: 19,
            }}
            todayBackgroundColor="#B58E78"
            todayTextStyle={{
              color: "#ffffff",
            }}
            onDateChange={(date) => {
              setCurrent(() => {
                let d = new Date(date.toString());
                let year = d.getFullYear().toString().padStart(2, "0");
                let month = d.getMonth() + 1;
                let realMonth = month.toString().padStart(2, "0");
                let day = d.getDate().toString().padStart(2, "0");
                let currentDate = `${year}-${realMonth}-${day}`;
                return currentDate;
              });
            }}
            selectedDayStyle={{
              backgroundColor: "#4F2717",
            }}
            selectedDayTextColor="#ffffff"
            monthTitleStyle={{
              fontSize: 28,
            }}
            yearTitleStyle={{
              fontSize: 28,
            }}
          />
          <View>
            {calendar[user.user_id] > 0 ? (
              calendar[user.user_id].map((evt, i) => {
                let event = evt.start.toString().split("T");
                if (current === event[0].toString()) {
                  let date = new Date(evt.start);
                  let endDate = new Date(evt.end);

                  let start =
                    date.getHours() > 11
                      ? `${
                          date.getHours !== 12 ? date.getHours() - 12 : 12
                        }:00 PM`
                      : `${date.getHours()}:00 AM`;
                  let end =
                    endDate.getHours() > 11
                      ? `${
                          endDate.getHours !== 12 ? endDate.getHours() - 12 : 12
                        }:00 PM`
                      : `${endDate.getHours()}:00 AM`;
                  return (
                    <View style={{ backgroundColor: "#B3E0FE" }} key={i}>
                      <Text style={styles.text}>
                        Me: {start} - {end}
                      </Text>
                    </View>
                  );
                }
              })
            ) : (
              <Text></Text>
            )}
            {todaysEvents() ? (
              filterFriends.map((friend, index) => {
                return calendar[friend.user_id].map((evt, i) => {
                  let event = evt.start.toString().split("T");

                  if (current === event[0].toString()) {
                    let date = new Date(evt.start);
                    let endDate = new Date(evt.end);

                    let start =
                      date.getHours() > 11
                        ? `${
                            date.getHours !== 12 ? date.getHours() - 12 : 12
                          }:00 PM`
                        : `${date.getHours()}:00 AM`;
                    let end =
                      endDate.getHours() > 11
                        ? `${
                            endDate.getHours !== 12
                              ? endDate.getHours() - 12
                              : 12
                          }:00 PM`
                        : `${endDate.getHours()}:00 AM`;
                    return (
                      <View style={{ backgroundColor: color[index] }} key={i}>
                        <Text style={styles.text}>
                          {friend.name
                            ? `${friend.name}: ${start} - ${end}`
                            : `Me: ${start} - ${end}`}
                        </Text>
                      </View>
                    );
                  }
                });
              })
            ) : (
              <View>
                <Text style={styles.title}></Text>
              </View>
            )}
          </View>
        </ScrollView>
        <View style={styles.bottomView}>
          <View style={styles.buttonSection}>
            <TouchableOpacity
              style={{ paddingTop: 10 }}
              onPress={() => navigation.navigate("Settings")}
            >
              <MaterialIcons name="settings" size={40} color="#F8E6CB" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Search Friends")}
            >
              <Ionicons name="add-circle" size={60} color="#F8E6CB" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ paddingTop: 10 }}
              onPress={() => navigation.navigate("Friends Checkbox")}
            >
              <FontAwesome5 name="user-friends" size={30} color="#F8E6CB" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8E6CB",
  },
  title: {
    margin: 10,
    fontSize: 36,
    textAlign: "center",
    fontFamily: "Itim_400Regular",
    color: "#4F2717",
  },
  text: {
    borderTopWidth: 1,
    borderTopColor: "#e5d3b3",
    textAlign: "center",
    paddingTop: 10,
    marginLeft: 13,
    marginRight: 13,
    marginBottom: 10,
    fontFamily: "ReemKufi_400Regular",
    color: "#4F2717",
    fontSize: 18,
  },
  borderLine: {
    borderTopWidth: 1,
    borderTopColor: "rgba(71, 56, 47, 0.3)",
    marginLeft: 13,
    marginRight: 13,
    marginTop: 5,
    marginBottom: 0,
  },
  buttonSection: {
    display: "flex",
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#B58E78",
    padding: 5,
    paddingRight: 10,
    paddingLeft: 10,
    borderColor: "#4F2717",
    borderWidth: 2,
    borderRadius: 20,
  },
  buttonText: {
    fontFamily: "ReemKufi_400Regular",
    fontSize: 18,
    color: "#ffffff",
  },
  bottomView: {
    width: "100%",
    height: 100,
    backgroundColor: "#B58E78",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
  },
  profile: { width: "100%", alignItems: "center" },
  image: {
    height: 25,
    width: 25,
    margin: 2,
    borderRadius: 20,
  },
  profileSection: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 100,
    backgroundColor: "#F8E6CB",
  },
  monthDayEvent: {
    // marginHorizontal: 1,
    backgroundColor: "transparent",
    borderBottomColor: "black",
    borderBottomWidth: 3,
    borderStyle: "dashed",
  },
  normalDay: {
    // marginHorizontal: 1,
  },
});
