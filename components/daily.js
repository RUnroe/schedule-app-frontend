import React from "react";
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
} from "@expo-google-fonts/dev";
import backButton from "../assets/arrow.png";
// import CalendarPicker from "react-native-calendar-picker";
//import { useState } from "react/cjs/react.development";

export default function Daily({ route, navigation }) {
  const currentDate = jsonConvertToDate(route.params);
  const [month, day, year] = currentDate.toLocaleDateString().split("/");
  let [fontsLoaded] = useFonts({
    Itim_400Regular,
    ReemKufi_400Regular,
  });

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

//Pass in daily events?
const ViewHours = () => {
  const twelveHours = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  return (
    <View>
      {twelveHours.map((hour, index) => {
        return (
          <View style={styles.hourBlock} key={index}>
            <Text>{hour} AM</Text>
            <TextInput style={styles.borderLine} editable={false} />
            {/* Event Input Here */}
          </View>
        );
      })}
      {twelveHours.map((hour, index) => {
        return (
          <View style={styles.hourBlock} key={index}>
            <Text>{hour} PM</Text>
            <TextInput style={styles.borderLine} editable={false} />
            {/* Event Input Here */}
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
  date = date.replaceAll('"', "").split("T");
  let dateArray = date[0].split("-");
  const year = parseInt(dateArray[0]);
  const month = parseInt(dateArray[1] - 1);
  const day = parseInt(dateArray[2]);

  return new Date(year, month, day);
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
  arrow: { marginTop: 60, marginLeft: 20, height: 29, width: 17 },
  date: {
    width: "100%",
    height: 80,
    justifyContent: "flex-start",
    alignItems: "flex-end",
    position: "absolute",
    top: 50,
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
