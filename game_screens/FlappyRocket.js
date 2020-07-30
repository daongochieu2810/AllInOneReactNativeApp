import React from 'react'
import {View, StyleSheet, Text} from 'react-native'
export default function FlappyRocket() {
    return (
        <View style={styles.container}>
            <Text>Flappy Rocket</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})