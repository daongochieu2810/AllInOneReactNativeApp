import React, {useState} from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "react-navigation-hooks";
export default function PostScreen() {
  const navigation = useNavigation();
  const [text, setText] = useState('')
  uploadPhoto = async (uri) => {
    const path = `photos/`
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Ionicons name="md-arrow-back" size={24} color="#c2c2c2" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={{ fontWeight: "500", color: "red" }}>Post</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <Image style={styles.avatar} source={require("../assets/avatar.jpg")}></Image>
        <TextInput
          multiline={true}
          numberOfLines={4}
          style={{ flex: 1, height: 48 }}
          placeholder="Share something"
          onChangeText={textInput => setText(textInput)}
          value={text}
        ></TextInput>
        <TouchableOpacity style={styles.photo}>
            <Ionicons name="md-camera" size={32} color="#D8D9D8"/>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e0dede",
  },
  inputContainer: {
    margin: 32,
    flexDirection: 'row'
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16
  },
  photo: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});
