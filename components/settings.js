import React, { useState, useContext, useEffect } from "react";
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
import { CalendarDetails, CurrentUser, PendingContext } from "./context";
import { Ionicons } from "@expo/vector-icons";

export default function Settings({ navigation }) {
  const [calendarDetails, setCalendarDetails] = useContext(CalendarDetails);
  const [url, setUrl] = useState("");
  const [cName, setCName] = useState("");
  const [error, setError] = useState(false);

  const [calendars, setCalendars] = useState({});

  let [fontsLoaded] = useFonts({
    Itim_400Regular,
    ReemKufi_400Regular,
  });

  useEffect(() => {
    console.log(calendarDetails);
    fetch("https://waffle.jtreed.org/api/v1/calendars/details", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setCalendars(data));
  }, []);

  const addCalendar = () => {
    let keyword = `replace${Math.floor(Math.random() * 100000) + 1}`;
    let values = {
      name: cName,
      url: url,
      enabled: true,
    };
    console.log({ [keyword]: values });

    fetch("https://waffle.jtreed.org/api/v1/calendars/details", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ ...calendars, [keyword]: values }),
    })
      .then(() => {
        setCalendars((prev) => ({ ...prev, [keyword]: values }));
        setCalendarDetails((prev) => [...prev, values]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deleteCalendar = (name) => {
    Object.keys(calendars).forEach((key) => {
      if (calendars[key].url === name) {
        delete calendars[key];
      }
    });
    fetch("https://waffle.jtreed.org/api/v1/calendars/details", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(calendars),
    })
      .then(() => {
        setCalendarDetails(calendarDetails.filter((item) => item.url !== name));
      })
      .catch((error) => {
        console.error(error);
      });
  };

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

          {calendarDetails.length > 0 ? (
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
                    <View style={{ marginLeft: 10, width: 220 }}>
                      <Text style={styles.calendarText} numberOfLines={1}>
                        {detail.url}
                      </Text>
                    </View>
                    <View>
                      <View style={{ marginLeft: 5, flexDirection: "row" }}>
                        <TouchableOpacity
                          onPress={() => deleteCalendar(detail.url)}
                        >
                          <Ionicons
                            style={{ marginLeft: 5 }}
                            name="trash-outline"
                            size={18}
                            color="#4F2717"
                          />
                        </TouchableOpacity>
                      </View>
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
              onChangeText={setCName}
              value={cName}
            />
            <TextInput
              style={styles.textInput}
              placeholder="ICS Link"
              onChangeText={setUrl}
              value={url}
            />
            <TouchableOpacity
              style={styles.whiteButton}
              onPress={() => {
                let urlCheck = url.substring(url.length - 4);
                if (urlCheck === ".ics") {
                  addCalendar();
                  setCName("");
                  setUrl("");
                  setError(false);
                } else {
                  setError(true);
                }
              }}
            >
              <Text style={styles.whiteButtonText}>Create</Text>
            </TouchableOpacity>
          </View>
          {error ? (
            <Text style={styles.error}>
              Cannot Create. Make sure to add ".ics"
            </Text>
          ) : (
            <View></View>
          )}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 30,
              marginBottom: 30,
            }}
          >
            <TouchableOpacity
              style={styles.whiteButton}
              onPress={() => {
                navigation.navigate("Month");
              }}
            >
              <Text style={styles.whiteButtonText}>Cancel</Text>
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
  error: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FF5F5F",
    textAlign: "center",
    marginTop: 10,
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
