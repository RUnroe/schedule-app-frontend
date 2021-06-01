import React, { useContext, useState } from "react";
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
import { CurrentUser } from "./context";

export default function AccountSettings({ navigation }) {
  const [user, setUser] = useContext(CurrentUser);
  const [email, setEmail] = useState(user.email);
  const [first, setFirst] = useState(user.first_name);
  const [last, setLast] = useState(user.last_name);
  const [errorMsg, setErrorMsg] = useState(false);
  const [validEmail, setValidEmail] = useState(true);
  const [validFirst, setValidFirst] = useState(true);
  const [validLast, setValidLast] = useState(true);

  const updateUser = () => {
    fetch("https://waffle.jtreed.org/api/v1/auth/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email: email,
        first_name: first,
        last_name: last,
      }),
    })
      .then(() => {
        setUser((prev) => ({
          ...prev,
          email: email,
          first_name: first,
          last_name: last,
        }));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deleteUser = () => {
    fetch("https://waffle.jtreed.org/api/v1/auth/", {
      method: "DELETE",
      credentials: "include",
    })
      .then(() => console.log("Successfully Deleted"))
      .catch((error) => {
        console.error(error);
      });
  };

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
        <View style={{ height: 70, backgroundColor: "#B58E78" }}>
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
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 30,
                marginBottom: 20,
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
                onPress={() => {
                  if (validateAll()) {
                    updateUser();
                    navigation.navigate("Month");
                  }
                }}
              >
                <Text style={styles.buttonText}>Save Changes</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => {
                deleteUser();
                navigation.navigate("Waffle");
              }}
            >
              <View style={styles.redButton}>
                <Text style={styles.redButtonText}>Logout</Text>
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
  arrow: { marginTop: 35, marginLeft: 20, height: 29, width: 17 },
  button: {
    backgroundColor: "#B58E78",
    padding: 1,
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
    marginRight: 20,
  },
  whiteButtonText: {
    fontFamily: "ReemKufi_400Regular",
    fontSize: 18,
    color: "#4F2717",
  },
  redButton: {
    backgroundColor: "#FFFAF2",
    padding: 1,
    paddingRight: 10,
    paddingLeft: 10,
    borderColor: "#FF5F5F",
    borderWidth: 2,
    borderRadius: 20,
    alignSelf: "center",
  },
  redButtonText: {
    fontFamily: "ReemKufi_400Regular",
    fontSize: 18,
    fontWeight: "600",
    color: "#FF5F5F",
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
