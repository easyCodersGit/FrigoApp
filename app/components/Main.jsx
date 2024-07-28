import React, { useState } from 'react'
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import logic from '../logic'

export function Main() {

    const [userId, setUserId] = useState('')
    const [message, setMessage] = useState('')

    const handleCheckUser = async () => {
        const userName = await logic.checkUser(userId)
        if (userName) {
            setMessage(`Welcome ${userName}`)
        } else {
            setMessage('Welcome stranger, please register')
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Welcome to FrigoApp</Text>
            <Image
                source={require('../img/frigoAppCartoon.webp')}
                style={styles.image}
            />
            <TextInput
                style={styles.input}
                placeholder="Enter User ID"
                value={userId}
                onChangeText={setUserId}
            />
            <Button title="Check User" onPress={handleCheckUser} />
            {message ? <Text style={styles.message}>{message}</Text> : null}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 24,
        color: '#000',
        marginBottom: 20,
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },
})
