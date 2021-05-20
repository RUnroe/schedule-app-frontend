import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
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

export default function SignUp({ navigation }) {
  const [email, setEmail] = useState("");
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errorMsg, setErrorMsg] = useState(false);
  const [validEmail, setValidEmail] = useState(true);
  const [validFirst, setValidFirst] = useState(true);
  const [validLast, setValidLast] = useState(true);
  const [validPass, setValidPass] = useState(true);
  const [validConfirm, setValidConfirm] = useState(true);

  let [fontsLoaded] = useFonts({
    Itim_400Regular,
    ReemKufi_400Regular,
  });

  const emailRegex = /\S+@\S+\.\S+/;
  const nameRegex = /^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const validation = (value, num) => {
    if (num === 0) {
      setEmail(value);
      emailRegex.test(value) ? setValidEmail(true) : setValidEmail(false);
    }
    if (num === 1) {
      setFirst(value);
      nameRegex.test(value) ? setValidFirst(true) : setValidFirst(false);
    }
    if (num === 2) {
      setLast(value);
      nameRegex.test(value) ? setValidLast(true) : setValidLast(false);
    }
    if (num === 3) {
      setPass(value);
      passwordRegex.test(value) ? setValidPass(true) : setValidPass(false);
    }
    if (num === 4) {
      setConfirm(value);
      value === pass ? setValidConfirm(true) : setValidConfirm(false);
    }
  };

  const validateAll = () => {
    if (email && first && last && pass && confirm) {
      setErrorMsg(false);
      if (validEmail && validFirst && validLast && validPass && validConfirm) {
        return true;
      }
      return false;
    }
    setErrorMsg(true);
    return false;
  };

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
          <Text style={styles.title}>Sign Up</Text>
          <View style={styles.inputSection}>
            <Text style={styles.text}>Email</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={(e) => validation(e, 0)}
              value={email}
            />
            {validEmail ? (
              validEmail
            ) : (
              <Text style={styles.error}>Invalid Email Name</Text>
            )}
            <Text style={styles.text}>First Name</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={(e) => validation(e, 1)}
              value={first}
            />
            {validFirst ? (
              validFirst
            ) : (
              <Text style={styles.error}>Invalid First Name</Text>
            )}
            <Text style={styles.text}>Last Name</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={(e) => validation(e, 2)}
              value={last}
            />
            {validLast ? (
              validLast
            ) : (
              <Text style={styles.error}>Invalid Last Name</Text>
            )}
            <Text style={styles.text}>Password</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={(e) => validation(e, 3)}
              value={pass}
            />
            {validPass ? (
              validPass
            ) : (
              <Text style={styles.error}>Invalid Password</Text>
            )}
            <Text style={styles.text}>Confirm Password</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={(e) => validation(e, 4)}
              value={confirm}
            />
            {validConfirm ? (
              validConfirm
            ) : (
              <Text style={styles.error}>Does not match password</Text>
            )}
            {errorMsg ? (
              <Text style={styles.emptyError}>Fill out All Input Fields</Text>
            ) : (
              errorMsg
            )}
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                if (validateAll()) {
                  //Create User
                  // FETCH POST values
                  navigation.navigate("Waffle");
                }
              }}
            >
              <Text style={styles.buttonText}>Create Account</Text>
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
  error: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FF5F5F",
    paddingLeft: 10,
  },
  emptyError: {
    paddingTop: 10,
    fontSize: 14,
    fontWeight: "700",
    color: "#FF5F5F",
    textAlign: "center",
  },
});
