import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import { useRouter, Link } from 'expo-router'
import { BackgroundImage } from '../components/background'
import { CircleInfoIcon } from '../components/icons'

export default function Register() {

    return (

        <View style={styles.container}>

            <BackgroundImage></BackgroundImage>

            <Text>Register</Text>

            <Link asChild href="/Main">
                <Pressable>
                    <CircleInfoIcon />
                </Pressable>
            </Link>


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