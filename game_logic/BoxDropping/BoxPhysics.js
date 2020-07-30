import Matter from "matter-js";
import { Dimensions } from "react-native";
import Box from "../../game_components/BoxDropping/Box";
const { width, height } = Dimensions.get("screen");

const distance = ([x1, y1], [x2, y2]) =>
  Math.sqrt(Math.abs(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)));

//gravity
const BoxPhysics = (entities, { time }) => {
  let engine = entities.physics.engine;
  Matter.Engine.update(engine, time.delta);
  return entities;
};

//create box by clicking
let boxIds = 0;
const CreateBox = (entities, { touches, time }) => {
  let world = entities.physics.world;
  const boxSize = Math.trunc(Math.max(width, height) * 0.075);
  touches
    .filter((t) => t.type === "press")
    .forEach((t) => {
      let body = Matter.Bodies.rectangle(
        t.event.pageX,
        t.event.pageY,
        boxSize,
        boxSize,
        {
          frictionAir: 0.021,
          friction: 1,
          restitution: 0,
          velocity: { x: 0, y: 1},
          inertia: Infinity,
        }
      );
      Matter.World.add(world, [body]);
      //console.log(boxIds)
      entities[++boxIds] = {
        body: body,
        size: [boxSize, boxSize],
        // color: boxIds % 2 == 0 ? "pink" : "orange",
        renderer: Box,
      };
    });
  return entities;
};
const MoveBox = (entities, { touches }) => {
  let constraint = entities.physics.constraint;

  //start touch
  let start = touches.find((x) => x.type === "start");

  if (start) {
    let startPos = [start.event.pageX, start.event.pageY];

    let boxId = Object.keys(entities).find((key) => {
      let body = entities[key].body;
      return (
        body && distance([body.position.x, body.position.y], startPos) < 25
      );
    });

    if (boxId) {
      constraint.pointA = { x: startPos[0], y: startPos[1] };
      constraint.bodyB = entities[boxId].body;
      constraint.pointB = { x: 0, y: 0 };
      constraint.angleB = entities[boxId].body.angle;
    }
  }
  //move touch
  let move = touches.find((x) => x.type === "move");

  if (move) {
    constraint.pointA = { x: move.event.pageX, y: move.event.pageY };
  }

  //end touch
  let end = touches.find((x) => x.type === "end");

  if (end) {
    constraint.pointA = null;
    constraint.bodyB = null;
    constraint.pointB = null;
  }

  return entities;
};
const CleanBoxes = (entities, { touches, screen }) => {
  let world = entities.physics.world;

  Object.keys(entities)
    .filter(
      (key) =>
        entities[key].body && entities[key].body.position.y > screen.height * 2
    )
    .forEach((key) => {
      Matter.Composite.remove(world, entities[key].body);
      delete entities[key];
    });

  return entities;
};
export { BoxPhysics, CreateBox, MoveBox, CleanBoxes };
