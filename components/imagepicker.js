import React, { useEffect } from "react";
import {
  Text,
  View,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useContext } from "react";
import { IconContext } from "./context";

export default function UploadImage() {
  const [image, setImage] = useContext(IconContext);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View>
      <TouchableOpacity style={styles.whiteButton} onPress={pickImage}>
        <Text style={styles.whiteButtonText}>Upload</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
