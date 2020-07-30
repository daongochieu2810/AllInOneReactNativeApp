import React from 'react'
import {View, Image } from 'react-native'
import { scaleTranslation } from 'react-native-redash'

export default function Floor(props) {
    const width = props.size[0]
    const height = props.size[1]
    const x = props.body.position.x - width/2
    const y = props.body.position.y - height/2
    const array = [1,2,3,4,5,6,7,8,9]
    return (
        <View style={{
            flex: 1,
            width: width ,
            height: height,
            position: 'absolute',
            left: x,
            top:y,
            flexDirection:'row'
        }}>
       {array.map(item => <Image
            style={{
                width: height ,
                height: height
            }}
            key={item}
            source={require("../../assets/box_dropping/floor.png")}
        />)}
        </View>
    )
}