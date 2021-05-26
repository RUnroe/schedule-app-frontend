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
import { AntDesign, Feather } from "@expo/vector-icons";
import { FriendsContext, PendingContext } from "./context";

export default function SearchFriends({ navigation }) {
  const [pending, setPending] = useContext(PendingContext);
  const [friends, setFriends] = useContext(FriendsContext);
  const [search, setSearch] = useState("");
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
          <Text style={styles.title}>Search Friends</Text>
          <View style={styles.inputSection}>
            <TextInput
              style={styles.textInput}
              placeholder="Friend's Name"
              onChangeText={setSearch}
              value={search}
            />
          </View>

          <Text style={styles.title}>Current Friends</Text>
          <Text style={styles.subTitle}>Pending Friends</Text>
          {pending ? (
            pending.map((friend, index) => {
              return (
                <View key={index} style={styles.friendsDisplay}>
                  <View style={styles.friendsSection}>
                    <Text style={styles.text}>{friend.name}</Text>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Feather
                        style={{ marginRight: 3 }}
                        name="check"
                        size={24}
                        color="#B58E78"
                      />
                      <Feather name="x" size={24} color="#B58E78" />
                    </View>
                  </View>
                  <TextInput style={styles.borderLine} editable={false} />
                </View>
              );
            })
          ) : (
            <Text>No Pending Friends</Text>
          )}
          <Text style={styles.subTitle}>All Friends</Text>
          {friends ? (
            friends.map((friend, index) => {
              return (
                <View key={index} style={styles.friendsDisplay}>
                  <View style={styles.friendsSection}>
                    <Text style={styles.text}>{friend.name}</Text>
                    <Feather name="x" size={24} color="#B58E78" />
                  </View>
                  <TextInput style={styles.borderLine} editable={false} />
                </View>
              );
            })
          ) : (
            <Text>No Friends</Text>
          )}
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
  },
  friendsSection: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 5,
  },
  friendsDisplay: {
    width: "70%",
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
  borderLine: {
    borderTopWidth: 1,
    borderTopColor: "rgba(71, 56, 47, 0.3)",
    width: "100%",
  },
  subTitle: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: "center",
    fontFamily: "Itim_400Regular",
    color: "#4F2717",
  },
});
