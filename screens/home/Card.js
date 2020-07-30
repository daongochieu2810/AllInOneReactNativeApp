import React from "react";
import { Dimensions, Image, StyleSheet, TouchableOpacity, Text} from "react-native";
import { useNavigation } from 'react-navigation-hooks'
const { width } = Dimensions.get("window");
const ratio = 228 / 362;
export const CARD_WIDTH = width * 0.8;
export const CARD_HEIGHT = CARD_WIDTH * ratio;
const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: 'black',
    borderRadius: 24
  },
  card_image: {
      width: CARD_WIDTH,
      height: CARD_HEIGHT - 40,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24
  }
});
export const Cards = {
  Card1: "1",
  Card2: "2",
  Card3: "3",
  Card4: "4",
  Card5: "5",
  Card6: "6",
}


export default (type) => {
    const navigation = useNavigation()
  let source = require("../../assets/avatar.jpg");
  return (
    <TouchableOpacity  style={styles.card} onPress={() => navigation.navigate("BoxDropping")}>
    <Image style={styles.card_image} {...{ source }} />
    <Text style={{
        color: 'white',
        alignSelf: 'center',
        marginTop: 10,
        fontSize: 15,
        fontWeight: '500'
    }}>Flappy Rocket</Text>
    </TouchableOpacity>
  )
};