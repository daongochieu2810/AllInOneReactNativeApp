import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  Image,
  ImageBackground,
} from "react-native";
import { GameEngine } from "react-native-game-engine";
import Matter, { Events } from "matter-js";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "react-navigation-hooks";
import { NavigationActions } from "react-navigation";
import Box from "../game_components/BoxDropping/Box";
import Floor from "../game_components/BoxDropping/Floor";
import {
  BoxPhysics,
  CreateBox,
  CleanBoxes,
  MoveBox,
} from "../game_logic/BoxDropping/BoxPhysics";

Matter.Common.isElement = () => false;

export default function BoxDropping() {
  const navigation = useNavigation();
  const { width, height } = Dimensions.get("window");

  const setUpWorld = () => {
    const engine = Matter.Engine.create({ enableSleeping: false });
    const world = engine.world;
    const boxSize = Math.trunc(Math.max(width, height) * 0.075);
    const box = Matter.Bodies.rectangle(
        width / 2, height/2, 
        boxSize, boxSize, {
        frictionAir: 0.021,
        friction: 1,
        restitution: 0,
        velocity: {x:0, y:1},
        inertia: Infinity
    });
    const floor = Matter.Bodies.rectangle(
      width / 2,
      height - boxSize / 2,
      width,
      boxSize,
      { isStatic: true }
    );
    const constraint = Matter.Constraint.create({
      label: "Drag Constraint",
      pointA: { x: 0, y: 0 },
      pointB: { x: 0, y: 0 },
      length: 0.01,
      stiffness: 0.1,
      angularStiffness: 1,
    });
    Matter.World.add(world, [box, floor]);
    Matter.World.addConstraint(world, constraint);
    Events.on(engine, 'collisionStart', (e) => {
        //console.log(e)
    })
    return {
      physics: {
        engine: engine,
        world: world,
        constraint: constraint,
      },
      box: {
        body: box,
        size: [boxSize, boxSize],
        color: "red",
        renderer: Box,
      },
      floor: {
        body: floor,
        size: [width, boxSize],
        renderer: Floor,
      },
    };
  };
  var entities = setUpWorld();
  return (
    <View style={styles.container}>
      <ImageBackground
        style={{
          width: width,
          height: height,
          flex: 1,
          resizeMode: "cover",
          justifyContent: "center",
        }}
        source={require("../assets/box_dropping/background.png")}
      >
        <GameEngine
          systems={[BoxPhysics, CreateBox, CleanBoxes, MoveBox]}
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
      </ImageBackground>
    </View>
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
