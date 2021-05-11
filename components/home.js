import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import {
  useFonts,
  Itim_400Regular,
  ReemKufi_400Regular,
} from "@expo-google-fonts/dev";

export default function Home({ navigation }) {
  let [fontsLoaded] = useFonts({
    Itim_400Regular,
    ReemKufi_400Regular,
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  } else {
    return (
      <View style={styles.container}>
        <View style={{ height: 60, backgroundColor: "#B58E78" }}></View>
        <Text style={styles.title}>Welcome To Waffle!</Text>
        <Text style={{ textAlign: "center", fontSize: 30, margin: 50 }}>
          -LOGO GOES HERE-
        </Text>
        <Text style={styles.text}>
          A simple scheduling app for you and your friends!
        </Text>
        <Text style={styles.text}>Get started today!</Text>
        <View style={styles.buttonSection}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Sign Up")}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Log In")}
          >
            <Text style={styles.buttonText}>Login</Text>
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
    margin: 50,
    fontSize: 36,
    textAlign: "center",
    fontFamily: "Itim_400Regular",
    color: "#4F2717",
  },
  text: {
    textAlign: "center",
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 30,
    fontFamily: "ReemKufi_400Regular",
    color: "#4F2717",
    fontSize: 18,
  },
  buttonSection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  button: {
    backgroundColor: "#B58E78",
    padding: 5,
    paddingRight: 10,
    paddingLeft: 10,
    borderColor: "#4F2717",
    borderWidth: 2,
    borderRadius: 20,
  },
  buttonText: {
    fontFamily: "ReemKufi_400Regular",
    fontSize: 18,
    color: "#ffffff",
  },
});
