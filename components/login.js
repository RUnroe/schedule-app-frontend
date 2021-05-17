import React from "react";
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
import { useState } from "react";
import Wuffle from "../assets/wuffleLogo.png";

export default function LogIn({ navigation }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  //validate email and pass

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
          <TouchableOpacity onPress={() => navigation.navigate("Waffle")}>
            <Image source={backButton} style={styles.arrow} />
          </TouchableOpacity>
        </View>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>Login</Text>
          <Image
            source={Wuffle}
            style={{ height: 200, width: 210, alignSelf: "center" }}
          />
          <View style={styles.inputSection}>
            <Text style={styles.text}>Email</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={setEmail}
              value={email}
            />
            <Text style={styles.text}>Password</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={setPass}
              value={pass}
            />

            {/* Change to go to month page */}
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("Month")}
            >
              <Text style={styles.buttonText}>Login</Text>
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
    marginTop: 7,
    marginLeft: 10,
    fontFamily: "ReemKufi_400Regular",
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
    marginBottom: 40,
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
