import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import {
  useFonts,
  Itim_400Regular,
  ReemKufi_400Regular,
} from "@expo-google-fonts/dev";
import backButton from "../assets/arrow.png";
// import CalendarPicker from "react-native-calendar-picker";
// import { useState } from "react/cjs/react.development";

export default function Daily({ route, navigation }) {
  //const [selectedStartDate, setSelectedStartDate] = useState(null);
  const { date } = route.params;
  console.log(date);
  //Retrieved date

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
          <TouchableOpacity onPress={() => navigation.navigate("Month")}>
            <Image source={backButton} style={styles.arrow} />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.text}>{date}</Text>
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
