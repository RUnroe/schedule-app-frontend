import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
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
import Wuffle from "../assets/smile.png";
import { Check, FilterFriendsContext, FriendsContext } from "./context";
import Checkbox from "expo-checkbox";

export default function FriendsCheckbox({ navigation }) {
  const [friends] = useContext(FriendsContext);
  const [filterFriends, setFilterFriends] = useContext(FilterFriendsContext);
  const [checked, setChecked] = useContext(Check);
  const [disable, setDisable] = useState(false);

  let [fontsLoaded] = useFonts({
    Itim_400Regular,
    ReemKufi_400Regular,
  });

  const filter = (checked) => {
    let filterArray = [];
    let count = 0;
    checked.map((check, index) => {
      if (check === true) {
        filterArray.push(friends[index]);
      }
    });
    if (count > 3) {
      setDisable(true);
    }
    setFilterFriends(filterArray);
    console.log(filterFriends[0]);
  };

  if (!fontsLoaded && friends?.current) {
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
          <Text style={styles.title}>Friends Calendars</Text>

          <Image
            source={Wuffle}
            style={{ height: 160, width: 150, alignSelf: "center" }}
          />
          <Text style={styles.text}>
            Note: You can only select up to four friends
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setChecked(() => {
                let list = [];
                checked.map(() => {
                  list.push(false);
                });
                return list;
              });
              setDisable(false);
              setFilterFriends([]);
            }}
          >
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>
          <View>
            {friends ? (
              friends.map((friend, index) => {
                return (
                  <View style={styles.checkboxDisplay} key={`Friend_${index}`}>
                    <View style={styles.checkboxSection}>
                      <Checkbox
                        value={checked[index]}
                        onValueChange={(e) => {
                          setChecked((prev) => {
                            let newList = [...prev];
                            newList[index] = e;
                            filter(newList);
                            return newList;
                          });
                        }}
                        color={checked ? "#4F2717" : undefined}
                        disabled={disable}
                      />
                      <Text style={styles.checkText}>{friend.name}</Text>
                    </View>
                    <TextInput style={styles.borderLine} editable={false} />
                  </View>
                );
              })
            ) : (
              <Text>No Friends</Text>
            )}
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Month")}
          >
            <Text style={styles.buttonText}>Save Changes</Text>
          </TouchableOpacity>
          <View style={styles.padding}></View>
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
    margin: 15,
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
    marginTop: 15,
    marginBottom: 15,
  },
  checkText: {
    fontFamily: "ReemKufi_400Regular",
    color: "#4F2717",
    fontSize: 18,
  },
  checkboxSection: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxDisplay: {
    width: 175,
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
  },
  arrow: { marginTop: 35, marginLeft: 20, height: 29, width: 17 },
  inputSection: { width: 250, alignSelf: "center" },
  textInput: {
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
    marginTop: 5,
    marginBottom: 20,
    paddingRight: 10,
    paddingLeft: 10,
    borderColor: "#4F2717",
    borderWidth: 2,
    borderRadius: 20,
    alignSelf: "center",
  },
  buttonText: {
    fontFamily: "ReemKufi_400Regular",
    fontSize: 18,
    color: "#ffffff",
  },
  padding: {
    padding: 20,
  },
  borderLine: {
    borderTopWidth: 1,
    borderTopColor: "rgba(71, 56, 47, 0.3)",
    width: "100%",
  },
});
