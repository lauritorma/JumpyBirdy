import Matter from "matter-js"
import Bird from "../components/Bird";
import Floor from "../components/Floor";

import { Dimensions } from "react-native";
import Obstacle from "../components/Obstacle";
import { getPipeSizePosPair } from "../utils/random";


const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width


export default restart => {
    let engine = Matter.Engine.create({enableSleeping: false})

    let world = engine.world

    world.gravity.y = 0.4;

    const pipeSizePOsA = getPipeSizePosPair()
    const pipeSizePOsB = getPipeSizePosPair(windowWidth * 0.9)

    return{
        physics: {engine, world},

        Bird: Bird(world, 'green', {x: 50, y: 300}, {height: 40, width: 40}),

        ObstacleTop1: Obstacle(world, 'ObstacleTop1', 'red', pipeSizePOsA.pipeTop.pos, pipeSizePOsA.pipeTop.size),
        ObstacleBottom1: Obstacle(world, 'ObstacleBottom1', 'blue', pipeSizePOsA.pipeBottom.pos, pipeSizePOsA.pipeBottom.size),

        ObstacleTop2: Obstacle(world, 'ObstacleTop2', 'red', pipeSizePOsB.pipeTop.pos, pipeSizePOsB.pipeTop.size),
        ObstacleBottom2: Obstacle(world, 'ObstacleBottom2', 'blue', pipeSizePOsB.pipeBottom.pos, pipeSizePOsB.pipeBottom.size),

        Floor: Floor(world, 'green', {x: windowWidth / 2, y: windowHeight}, {height: 50, width: windowWidth})
    } 
}