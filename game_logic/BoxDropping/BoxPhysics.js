import Matter from 'matter-js'
import { Dimensions } from 'react-native'
import Box from '../../game_components/BoxDropping/Box'
const {width, height} = Dimensions.get('screen')
const BoxPhysics = (entities, {time}) => {
    let engine = entities.physics.engine
    Matter.Engine.update(engine, time.delta)
    return entities
}
let boxIds = 0;
const CreateBox = (entities, {touches, time}) => {
    let world = entities.physics.world
    const boxSize = Math.trunc(Math.max(width, height) * 0.075)
    touches.filter(t => t.type === "press").forEach(t => {
        let body = Matter.Bodies.rectangle(
            t.event.pageX, t.event.pageY,
            boxSize, boxSize, {frictionAir: 0.021}
        )
        Matter.World.add(world, [body])
        entities[++boxIds] = {
            body: body,
            size: [boxSize, boxSize],
            color: boxIds % 2 == 0 ? 'pink' : 'orange',
            renderer: Box
        }
    })
    return entities
}
export {
    BoxPhysics,
    CreateBox
}