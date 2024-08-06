import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import { BackgroundImage } from '../components/background'

export default function Register() {

    return (

        <View style={styles.container}>

            <BackgroundImage></BackgroundImage>

            <Text>Register</Text>

        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    backgroundImage: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },

})