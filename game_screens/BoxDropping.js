import React, {useState, useEffect} from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { GameEngine } from "react-native-game-engine";
import Matter from "matter-js";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "react-navigation-hooks";
import { NavigationActions } from "react-navigation";
import Box from '../game_components/BoxDropping/Box'
import { BoxPhysics , CreateBox} from '../game_logic/BoxDropping/BoxPhysics'

export default function BoxDropping() {
  const navigation = useNavigation();
  const {width, height} = Dimensions.get('screen')
 
  const setUpWorld = () => {
    const engine = Matter.Engine.create({enableSleeping: false})
    const world = engine.world
    const boxSize = Math.trunc(Math.max(width, height) * 0.075)
    const box = Matter.Bodies.rectangle(
        width/2,
        height/2,
        boxSize,
        boxSize
    )
    const floor = Matter.Bodies.rectangle(
        width/2,
        height - boxSize * 1.2, width, boxSize, {isStatic: true}
    )
    Matter.World.add(world, [box, floor])
    return {
        physics: {
            engine: engine,
            world: world
        },
        box: {
            body: box,
            size: [boxSize, boxSize],
            color: 'red',
            renderer: Box
        },
        floor: {
            body: floor,
            size: [width, boxSize],
            color: 'green',
            renderer: Box
        }
    }
  }
  var entities = setUpWorld()
  return (
    <GameEngine 
    style={styles.container}
    systems={[BoxPhysics, CreateBox]}
    entities={entities}
    >
      <TouchableOpacity
        style={styles.back}
        onPress={() =>
          navigation.navigate(
            "App",
            {},
            NavigationActions.navigate({ routeName: "HomeScreen" })
          )
        }
      >
        <Ionicons name="ios-arrow-round-back" color="white" size={32} />
      </TouchableOpacity>
      <StatusBar hidden={true} />
    </GameEngine>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  back: {
    position: "absolute",
    top: 32,
    left: 32,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#ff3b3b",
    alignItems: "center",
    justifyContent: "center",
  },
});
