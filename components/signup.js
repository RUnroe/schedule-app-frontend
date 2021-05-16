import React from "react";
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
import UploadImage from "./imagepicker";
import { useContext } from "react";
import { IconContext } from "./context";
import Wuffle from "../assets/wuffleLogo.png";

export default function SignUp({ navigation }) {
  const [email, setEmail] = useState("");
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState("");
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
          <TouchableOpacity onPress={() => navigation.navigate("Waffle")}>
            <Image source={backButton} style={styles.arrow} />
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>Sign Up</Text>
        <View style={styles.inputSection}>
          <View style={{ alignItems: "center" }}>
            {icon ? (
              <Image style={styles.image} source={{ uri: icon }} />
            ) : (
              <Image style={styles.image} source={Wuffle} />
            )}
            {/* <Image style={styles.image} source={{ uri: icon }} /> */}
          </View>
          <TouchableOpacity onPress={() => setIcon(null)}>
            <Text
              style={{
                textAlign: "center",
                fontSize: 15,
                fontWeight: "700",
                color: "#FF5F5F",
                paddingTop: 10,
              }}
            >
              Remove
            </Text>
          </TouchableOpacity>

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
          <Text style={styles.text}>Password</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={setPass}
            value={pass}
          />
          <Text style={styles.text}>Confirm Password</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={setConfirm}
            value={confirm}
          />
          <Text style={styles.text}>User Icon</Text>
          <UploadImage />
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Waffle")}
          >
            <Text style={styles.buttonText}>Create Account</Text>
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
    margin: 10,
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
    alignSelf: "flex-start",
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
