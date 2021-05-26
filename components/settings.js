import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import {
  useFonts,
  Itim_400Regular,
  ReemKufi_400Regular,
} from "@expo-google-fonts/dev";
import backButton from "../assets/arrow.png";
import { CalendarDetails } from "./context";

export default function Settings({ navigation }) {
  const [calendarDetails, setCalendarDetails] = useContext(CalendarDetails);
  const [ics, setIcs] = useState("");

  let [fontsLoaded] = useFonts({
    Itim_400Regular,
    ReemKufi_400Regular,
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  } else {
    return (
      <View style={styles.container}>
        <View style={{ height: 70, backgroundColor: "#B58E78" }}>
          <TouchableOpacity onPress={() => navigation.navigate("Month")}>
            <Image source={backButton} style={styles.arrow} />
          </TouchableOpacity>
        </View>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>Settings</Text>

          {calendarDetails ? (
            calendarDetails.map((detail, index) => {
              return (
                <View style={{ width: "97%", alignSelf: "center" }} key={index}>
                  <View
                    style={{
                      flexDirection: "row",
                    }}
                  >
                    <View style={{ marginLeft: 5, width: 110 }}>
                      <Text style={styles.calendarText} numberOfLines={1}>
                        {detail.name}
                      </Text>
                    </View>
                    <View style={{ marginLeft: 5, width: 220 }}>
                      <Text style={styles.calendarText} numberOfLines={1}>
                        {detail.url}
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.calendarText}>
                        {detail.enabled ? "TRUE" : "FALSE"}
                      </Text>
                    </View>
                  </View>
                  <TextInput style={styles.borderLine} editable={false} />
                </View>
              );
            })
          ) : (
            <View></View>
          )}
          <Text style={styles.text}>Add To Calendar</Text>
          <View style={styles.calendarInput}>
            <TextInput
              style={styles.textInput}
              placeholder="Name"
              onChangeText={setIcs}
              value={ics}
            />
            <TextInput
              style={styles.textInput}
              placeholder="ICS Link"
              onChangeText={setIcs}
              value={ics}
            />
            <TouchableOpacity
              style={styles.whiteButton}
              onPress={() => {
                console.log("create calendar object");
              }}
            >
              <Text style={styles.whiteButtonText}>Create</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 40,
              marginBottom: 30,
            }}
          >
            <TouchableOpacity
              style={styles.whiteButton}
              onPress={() => {
                console.log("create calendar object");
              }}
            >
              <Text style={styles.whiteButtonText}>Create</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("Month")}
            >
              <Text style={styles.buttonText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

// 181783920193021334: {name: "get outlook for toster", url: "https://eeee.outlook.com/ur-mom.ics", enabled: true}
// 181783920193021336: {name: "gogle", url: "https://gmail.google.com/zoinks.ics", enabled: false}
// 181783920193021337: {name: "YAHOOOOOOOO", url: "https://yahoo.mx/adsadfal.ics", enabled: true}
// 181783920193021338: {name: "wait are you guys outside", url: "https://cody.ashby/no/sorry.ics", enabled: true}
// replace1: {name: "free", url: "stuff.ics", enabled: true}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8E6CB",
  },
  title: {
    margin: 20,
    fontSize: 40,
    textAlign: "center",
    fontFamily: "Itim_400Regular",
    color: "#4F2717",
  },
  text: {
    fontFamily: "ReemKufi_400Regular",
    textAlign: "center",
    color: "#4F2717",
    fontSize: 18,
    margin: 10,
  },
  calendarText: {
    fontFamily: "ReemKufi_400Regular",
    color: "#4F2717",
    fontSize: 14,
  },
  calendarInput: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  arrow: { marginTop: 35, marginLeft: 20, height: 29, width: 17 },
  inputSection: { width: 250, alignSelf: "center" },
  textInput: {
    marginLeft: 5,
    marginRight: 5,
    width: 125,
    backgroundColor: "#FFFAF2",
    padding: 1,
    paddingLeft: 12,
    borderColor: "#4F2717",
    borderWidth: 2,
    borderRadius: 20,
    fontFamily: "ReemKufi_400Regular",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#B58E78",
    padding: 1,
    paddingRight: 10,
    paddingLeft: 10,
    borderColor: "#4F2717",
    borderWidth: 2,
    borderRadius: 20,
    alignSelf: "center",
    marginLeft: 10,
  },
  buttonText: {
    fontFamily: "ReemKufi_400Regular",
    fontSize: 18,
    color: "#ffffff",
  },
  whiteButton: {
    backgroundColor: "#FFFAF2",
    padding: 1,
    paddingRight: 10,
    paddingLeft: 10,
    borderColor: "#4F2717",
    borderWidth: 2,
    borderRadius: 20,
    marginLeft: 5,
    marginRight: 5,
    alignSelf: "center",
  },
  whiteButtonText: {
    fontFamily: "ReemKufi_400Regular",
    fontSize: 18,
    color: "#4F2717",
  },
  borderLine: {
    borderTopWidth: 1,
    borderTopColor: "rgba(71, 56, 47, 0.3)",
    width: "100%",
  },
});
