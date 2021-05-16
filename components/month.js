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
import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useContext } from "react";
import { IconContext } from "./context";
import Wuffle from "../assets/wuffleLogo.png";

export default function Month({ navigation }) {
  const [icon, setIcon] = useContext(IconContext);
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
          <TouchableOpacity
            onPress={() => navigation.navigate("Account Settings")}
          >
            <View style={styles.profile}>
              <View style={styles.profileSection}>
                {icon ? (
                  <Image style={styles.image} source={{ uri: icon }} />
                ) : (
                  <Image style={styles.image} source={Wuffle} />
                )}
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: "ReemKufi_400Regular",
                    color: "#FFFAF2",
                  }}
                >
                  Username
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        {/* Calendar */}
        <CalendarPicker
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
            navigation.navigate("Daily", { date: JSON.stringify(date) });
          }}
          selectedDayStyle={{
            backgroundColor: "#F8E6CB",
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
          <Text style={styles.text}>Today's Events</Text>
        </View>
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
    height: 20,
    width: 20,
    margin: 5,
  },
  profileSection: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 35,
    padding: 5,
    paddingRight: 10,
    borderRadius: 100,
    backgroundColor: "black",
  },
});
