import Matter from 'matter-js'
import React from 'react'
import {Image, View } from 'react-native'

const Obstacle = props => {
    const widthBody = props.body.bounds.max.x - props.body.bounds.min.x
    const heightBody = props.body.bounds.max.y - props.body.bounds.min.y

    const xBody = props.body.position.x - widthBody /2
    const yBody = props.body.position.y - heightBody /2

    const color = props.color;

    return(
        <View style={{
            borderWidth: 0,
            borderColor: color,
            borderStyle: 'solid',
            position: 'absolute',
            left: xBody,
            top: yBody,
            width: widthBody,
            height: heightBody
        }}>
            <Image
            style={{
        
                flex:1 , width: undefined, height: undefined,resizeMode: 'cover'
                
            }}
            source={require('../images/tree.png')}
            >

            </Image>
        </View>
    )
}

export default (world, label, color, pos, size) => {
    const initialObstacle = Matter.Bodies.rectangle(
        pos.x,
        pos.y,
        size.width,
        size.height,
        {
            label,
            isStatic: true
        }
    )
    Matter.World.add(world, initialObstacle)

    return {
        body: initialObstacle,
        color,
        pos,
        renderer: <Obstacle/>
    }
}
