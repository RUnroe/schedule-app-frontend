import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
} from "react-native";
import {
  useFonts,
  Itim_400Regular,
  ReemKufi_400Regular,
  NewsCycle_700Bold,
} from "@expo-google-fonts/dev";
import backButton from "../assets/arrow.png";
import {
  CalendarContext,
  FilterFriendsContext,
  FriendsContext,
} from "./context";

export default function Daily({ route, navigation }) {
  const [friends, setFriends] = useContext(FriendsContext);
  const [calendar, setCalendar] = useContext(CalendarContext);
  const [filterFriends] = useContext(FilterFriendsContext);
  const currentDate = jsonConvertToDate(route.params);
  const [month, day, year] = currentDate.toLocaleDateString().split("/");

  const [events, setEvents] = useState([]);

  let [fontsLoaded] = useFonts({
    Itim_400Regular,
    ReemKufi_400Regular,
  });

  const formatDate = (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  // if (filterFriends) {
  //   filterFriends.map((friend, index) => {
  //     calendar[friend.user_id].map((evt) => {
  //       let event = evt.start.toString().split("T");
  //       if (formatDate(currentDate) === event[0].toString()) {
  //         //DO MAFS AND DISPLAY DAILY DATA
  //         let date = new Date(evt.start);
  //         let endDate = new Date(evt.end);
  //         let totalHours = date.getHours() - endDate.getHours();

  //         console.log(date.getHours());
  //         console.log(endDate.getHours());
  //         // setEvents((prev) => [...prev, date, totalHours]);
  //       }
  //     });
  //   });
  // }

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  } else {
    return (
      <View style={styles.container}>
        <View style={{ height: 90, backgroundColor: "#B58E78" }}>
          <View style={styles.date}>
            <Text
              style={{
                fontSize: 30,
                fontFamily: "ReemKufi_400Regular",
                color: "#FFFAF2",
              }}
            >
              {monthName(month)} {day}, {year}
            </Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("Month")}>
            <Image source={backButton} style={styles.arrow} />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.text}>{dayOfWeek(currentDate.getDay())}</Text>
        </View>
        <ScrollView
          style={styles.scrollView}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <ViewHours />
        </ScrollView>
      </View>
    );
  }
}

//Pass in daily events
const ViewHours = () => {
  const hours = [
    12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    11,
  ];
  return (
    <View>
      {hours.map((hour, index) => {
        return (
          <View style={styles.hourBlock} key={index}>
            <Text>
              {hour} {index > 11 ? "PM" : "AM"}
            </Text>
            <TextInput style={styles.borderLine} editable={false} />
            <View>
              {/* Event Input Here */}
              <Text></Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

const monthName = (monthNum) => {
  const num = parseInt(monthNum) - 1;
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return monthNames[num];
};

const dayOfWeek = (getDayNum) => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[getDayNum];
};

const jsonConvertToDate = (jsonDate) => {
  let { date } = jsonDate;
  console.log(date);
  date = date.replace('"', "");
  date = date.replace('"', "");
  return new Date(date);
};

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
    textAlign: "center",
    marginBottom: 10,
    marginTop: 10,
    fontFamily: "ReemKufi_400Regular",
    color: "#4F2717",
    fontSize: 25,
  },
  buttonSection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
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
  arrow: { marginTop: 50, marginLeft: 20, height: 29, width: 17 },
  date: {
    width: "100%",
    height: 80,
    justifyContent: "flex-start",
    alignItems: "flex-end",
    position: "absolute",
    top: 40,
    right: 20,
  },
  hourBlock: {
    display: "flex",
    flexDirection: "row",
    padding: 15,
  },
  borderLine: {
    marginTop: 8,
    marginLeft: 10,
    borderTopWidth: 1,
    borderTopColor: "rgba(71, 56, 47, 0.3)",
    width: "100%",
  },
});
