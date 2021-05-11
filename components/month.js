import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import {
  useFonts,
  Itim_400Regular,
  ReemKufi_400Regular,
} from "@expo-google-fonts/dev";
import backButton from "../assets/arrow.png";
import CalendarPicker from "react-native-calendar-picker";
// import { useState } from "react/cjs/react.development";

export default function Month({ navigation }) {
  let [fontsLoaded] = useFonts({
    Itim_400Regular,
    ReemKufi_400Regular,
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  } else {
    return (
      <View style={styles.container}>
        <View style={{ height: 80, backgroundColor: "#B58E78" }}>
          <TouchableOpacity onPress={() => navigation.navigate("Waffle")}>
            <Image source={backButton} style={styles.arrow} />
          </TouchableOpacity>
        </View>

        {/* Calendar */}
        <CalendarPicker
          textStyle={{
            color: "#4F2717",
            fontFamily: "ReemKufi_400Regular",
            fontSize: 19,
          }}
          onDateChange={(date) => {
            navigation.navigate("Daily", { date: JSON.stringify(date) });
          }}
        />
        <View>
          <Text style={styles.text}>Today's Events</Text>
        </View>
        <View style={styles.buttonSection}>
          {/* */}

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Log In")}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bottomView}>
          <Text>Settings/SearchFriends/FriendsCheckbox</Text>
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
    textAlign: "center",
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 30,
    fontFamily: "ReemKufi_400Regular",
    color: "#4F2717",
    fontSize: 18,
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
  arrow: { marginTop: 45, marginLeft: 20, height: 29, width: 17 },
  bottomView: {
    width: "100%",
    height: 80,
    backgroundColor: "#B58E78",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
  },
});
