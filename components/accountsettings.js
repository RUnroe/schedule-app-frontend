import React, { useContext } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import {
  useFonts,
  Itim_400Regular,
  ReemKufi_400Regular,
} from "@expo-google-fonts/dev";
import backButton from "../assets/arrow.png";
import { useState } from "react";
import Wuffle from "../assets/wuffleLogo.png";
import UploadImage from "./imagepicker";
import { IconContext } from "./context";

export default function AccountSettings({ navigation }) {
  const [email, setEmail] = useState("");
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
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
          <TouchableOpacity onPress={() => navigation.navigate("Month")}>
            <Image source={backButton} style={styles.arrow} />
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>Account Settings</Text>
        <View style={{ alignItems: "center" }}>
          {icon ? (
            <Image style={styles.image} source={{ uri: icon }} />
          ) : (
            <Image style={styles.image} source={Wuffle} />
          )}
          {/* <Image style={styles.image} source={{ uri: icon }} /> */}
        </View>
        <Text style={{ textAlign: "center", fontSize: 10, margin: 20 }}>
          -Remove Btn-
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Waffle")}>
          <View style={styles.whiteButton}>
            <Text styl={styles.whiteButtonText}>Logout</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.inputSection}>
          <Text style={styles.text}>Email</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={setEmail}
            value={email}
          />
          <Text style={styles.text}>First Name</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={setFirst}
            value={first}
          />
          <Text style={styles.text}>Last Name</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={setLast}
            value={last}
          />
          <Text style={styles.text}>User Icon</Text>
          <UploadImage />
          <Text>Todo: Addddd Cancel Button</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Month")}
          >
            <Text style={styles.buttonText}>Save Changes</Text>
          </TouchableOpacity>
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
  arrow: { marginTop: 45, marginLeft: 20, height: 29, width: 17 },
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
  whiteButton: {
    backgroundColor: "#FFFAF2",
    padding: 1,
    paddingRight: 10,
    paddingLeft: 10,
    borderColor: "#4F2717",
    borderWidth: 2,
    borderRadius: 20,
    alignSelf: "center",
  },
  whiteButtonText: {
    fontFamily: "ReemKufi_400Regular",
    fontSize: 18,
    color: "#4F2717",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: "hidden",
  },
});
