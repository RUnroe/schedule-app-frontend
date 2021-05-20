import React, { useContext } from "react";
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

export default function AccountSettings({ navigation }) {
  //Set value of login info
  const [email, setEmail] = useState("");
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  //
  const [errorMsg, setErrorMsg] = useState(false);
  const [validEmail, setValidEmail] = useState(true);
  const [validFirst, setValidFirst] = useState(true);
  const [validLast, setValidLast] = useState(true);

  let [fontsLoaded] = useFonts({
    Itim_400Regular,
    ReemKufi_400Regular,
  });

  const emailRegex = /\S+@\S+\.\S+/;
  const nameRegex = /^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i;

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
  };

  const validateAll = () => {
    if (email && first && last) {
      setErrorMsg(false);
      if (validEmail && validFirst && validLast) {
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
          <TouchableOpacity onPress={() => navigation.navigate("Month")}>
            <Image source={backButton} style={styles.arrow} />
          </TouchableOpacity>
        </View>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>Account Settings</Text>
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

            {errorMsg ? (
              <Text style={styles.emptyError}>Fill out All Input Fields</Text>
            ) : (
              errorMsg
            )}
            <Text>Todo: Addddd Cancel Button</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                if (validateAll()) {
                  //Create User
                  // FETCH PUT values
                  navigation.navigate("Month");
                }
              }}
            >
              <Text style={styles.buttonText}>Save Changes</Text>
            </TouchableOpacity>
            {/* Sign out user */}
            <TouchableOpacity onPress={() => navigation.navigate("Waffle")}>
              <View style={styles.whiteButton}>
                <Text style={styles.whiteButtonText}>Logout</Text>
              </View>
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
