import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
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
        <Text style={styles.title}>Welcome To Waffle!</Text>
        <Text style={styles.itim}>Content</Text>
        <Text style={styles.reem}>Testing</Text>
        <Button
          title="Go To Sign Up"
          onPress={() => navigation.navigate("Sign Up")}
        />
        <Button
          title="Go To Login"
          onPress={() => navigation.navigate("Log In")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8E6CB",
    // justifyContent: "center",
    // alignItems: "center",
  },
  title: {
    fontSize: 40,
    textAlign: "center",
    fontFamily: "Itim_400Regular",
  },
  reem: {
    fontFamily: "ReemKufi_400Regular",
  },
});
