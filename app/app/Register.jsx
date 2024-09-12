import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Alert, Pressable, ImageBackground  } from 'react-native'
import { useRouter, Link } from 'expo-router'
import { BackgroundImage } from '../components/background'
import { CircleInfoIcon } from '../components/icons'
import { ButtonBlue, ButtonSecondary } from '../components/buttons'
import registerUser from '../logic/registerUser'
import { Input } from '../components/input'


export default function Register() {

    const router = useRouter()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [isPressed, setIsPressed] = useState(false)

    const handleRegister = async () => {
        try {
            await registerUser(name, email, password)
            setMessage('Register successful!')
            router.push('/')
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <View style={styles.container}>
            <BackgroundImage />

            <View style={styles.imageContainer}>
                <ImageBackground
                    source={require('../img/fondoConNombre1.png')}
                    style={styles.fridgeImage}
                    resizeMode="contain"
                >
                    <View style={styles.overlay}>
                        <View style={styles.loginContainer}>

                        <Input
                                placeholder="Enter Name"
                                value={name}
                                onChangeText={setName}
                                keyboardType="name-user"
                            />
                            <Input
                                placeholder="Enter Email"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                            />

                            <Input
                                placeholder="Enter Password"
                                value={password}
                                onChangeText={setPassword}
                                keyboardType="default"
                                secureTextEntry={true}
                            />

                          
                        </View>

                        <View style={styles.buttonRow}>
                        <ButtonSecondary
                                label="REGISTER"
                                onPress={handleRegister}
                                onPressIn={() => setIsPressed(true)}
                                onPressOut={() => setIsPressed(false)}
                            />
                           
                        </View>
                    </View>
                </ImageBackground>
            </View>

            <Link asChild href="/about">
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
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fridgeImage: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        position: 'absolute',
        top: '40%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginContainer: {
        width: 200,
        height: 190,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 90,
    },
})
