import React, { useContext, useState } from "react";
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
import { CalendarContext, FilterFriendsContext } from "./context";
import Wuffle from "../assets/sleepyWaffle.png";

export default function Month({ navigation }) {
  const [filterFriends] = useContext(FilterFriendsContext);
  const [calendar] = useContext(CalendarContext);
  const [current, setCurrent] = useState(() => {
    let date = new Date();
    let year = date.getFullYear().toString().padStart(2, "0");
    let month = date.getMonth() + 1;
    let realMonth = month.toString().padStart(2, "0");
    let day = date.getDate().toString().padStart(2, "0");
    let currentDate = `${year}-${realMonth}-${day}`;
    return currentDate;
  });

  let [fontsLoaded] = useFonts({
    Itim_400Regular,
    ReemKufi_400Regular,
  });

  const checkEvents = (isoDate) => {
    let styl = { containerStyle: styles.normalDay };
    let changed = false;
    if (filterFriends) {
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
    return styl;
  };

  const todaysEvents = () => {
    let bool = false;
    if (filterFriends) {
      filterFriends.forEach((friend, index) => {
        calendar[friend.user_id].forEach((evt, i) => {
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
        <View style={{ height: 90, backgroundColor: "#B58E78" }}>
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
                  Username
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
              backgroundColor: "#ffffff",
            }}
            selectedDayTextColor="#4F2717"
            monthTitleStyle={{
              fontSize: 28,
            }}
            yearTitleStyle={{
              fontSize: 28,
            }}
          />
          <View>
            <Text style={styles.text}>Events</Text>
            {todaysEvents() ? (
              filterFriends.map((friend, index) => {
                return calendar[friend.user_id].map((evt, i) => {
                  let event = evt.start.toString().split("T");

                  if (current === event[0].toString()) {
                    let date = new Date(evt.start);
                    let endDate = new Date(evt.end);
                    let totalHours = endDate.getHours() - date.getHours();
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
                      <View key={i}>
                        <Text>
                          {current}
                          {friend.name} has an {totalHours} hour event from{" "}
                          {start} - {end}
                        </Text>
                      </View>
                    );
                  }
                });
              })
            ) : (
              <View>
                <Image
                  source={Wuffle}
                  style={{ height: 200, width: 210, alignSelf: "center" }}
                />
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
    margin: 50,
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
  arrow: { marginTop: 45, marginLeft: 20, height: 29, width: 17 },
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
    marginTop: 40,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 100,
    backgroundColor: "#F8E6CB",
  },
  monthDayEvent: {
    // marginHorizontal: 1,
    backgroundColor: "transparent",
    borderColor: "#B58E78",
    borderWidth: 2,
    borderStyle: "solid",
  },
  normalDay: {
    // marginHorizontal: 1,
  },
});
