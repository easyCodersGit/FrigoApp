import React, { useState } from 'react'
import { View, Text, TextInput, Pressable, StyleSheet, Image } from 'react-native';
import logic from '../logic'

export function Main() {
    const [userId, setUserId] = useState('')
    const [message, setMessage] = useState('')
    const [isPressed, setIsPressed] = useState(false)

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
            <Image
                source={require('../img/fondoApp1.png')}
                style={styles.backgroundImage}
                resizeMode='cover'
            />
            <Image
                source={require('../img/frigolarga.png')}
                style={styles.fridgeImage}
                resizeMode='contain'
            />
            <View style={styles.overlay}>
                {/* <Text style={styles.text}>Welcome to FrigoApp</Text> */}
                <TextInput
                    style={styles.input}
                    placeholder="Enter User ID"
                    value={userId}
                    onChangeText={setUserId}
                />
                <Pressable
                    onPress={handleCheckUser}
                    onPressIn={() => setIsPressed(true)}
                    onPressOut={() => setIsPressed(false)}
                >
                    <Image
                        source={isPressed ? require('../img/checkUserButtonPressed.png') : require('../img/checkUserButton.png')}
                        style={styles.buttonImage}
                    />
                </Pressable>
                {message ? <Text style={styles.message}>{message}</Text> : null}
            </View>
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
    fridgeImage: {
        position: 'absolute',
        width: '100%', // increased size
        height: '100%', // increased size
        top: '50%',
        left: '50%',
        transform: [{ translateX: -200 }, { translateY: -450 }], // adjust to center the image
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.45)',
    },
    text: {
        fontSize: 24,
        color: '#000',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 100,

        marginBottom: 20,
        paddingHorizontal: 10,
        width: 130,
    },
    buttonImage: {
        width: 150, // adjust the size as needed
        height: 130, // adjust the size as needed
        marginTop: 20,
    },
    message: {
        marginTop: 20,
        fontSize: 18,
        color: '#000',
    },
})
