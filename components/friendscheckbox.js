import React, { useContext, useState } from "react";
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
import Wuffle from "../assets/wuffleLogo.png";
import { Check, FilterFriendsContext, FriendsContext } from "./context";
import Checkbox from "expo-checkbox";

export default function FriendsCheckbox({ navigation }) {
  const [friends, setFriends] = useContext(FriendsContext);
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
    checked.forEach((check, index) => {
      if (check === true) {
        count++;
        filterArray.push(friends.current[index]);
      }
    });
    if (count > 3) {
      setDisable(true);
    }
    setFilterFriends(filterArray);
  };

  if (!fontsLoaded && friends?.current) {
    return <Text>Loading...</Text>;
  } else {
    return (
      <View style={styles.container}>
        <View style={{ height: 90, backgroundColor: "#B58E78" }}>
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
            style={{ height: 200, width: 210, alignSelf: "center" }}
          />
          <Text>Note: You can only select up to four friends</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setChecked(() => {
                let list = [];
                friends.current.forEach(() => {
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
            {friends?.current ? (
              friends.current.map((friend, index) => {
                //console.log(friend);
                return (
                  <View key={`Friend_${index}`}>
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
                      color={checked ? "#666666" : undefined}
                      disabled={disable}
                    />
                    <Text>{friend.name}</Text>
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
  },
  arrow: { marginTop: 45, marginLeft: 20, height: 29, width: 17 },
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
    marginTop: 20,
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
});
