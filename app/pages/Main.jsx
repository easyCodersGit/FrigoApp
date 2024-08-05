// app/pages/Main.jsx
import React, { useState } from 'react';
import { useRouter, Link } from 'expo-router';
import { View, Text, TextInput, Pressable, StyleSheet, ImageBackground } from 'react-native';
import loginUser from '../logic/loginUser';
import { CircleInfoIcon } from '../components/icons';
import { ButtonBlue, ButtonSecondary } from '../components/buttons';
import { Input } from '../components/input'
import { BackgroundImage } from '../components/background';

export function Main() {
    const [userId, setUserId] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('');
    const [isPressed, setIsPressed] = useState(false)

    const handleRegister = () => {
        alert("Este link te llevará al Register")
        router.push('/Register')
    }

    const handleGuest = () => {
        alert("Este link te llevará a la página de Invitado")
    }

    const router = useRouter()

    const handleLogin = async () => {
        try {
            await loginUser(email, password)
            setMessage('Login successful!')
            router.push('/Home')
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <View style={styles.container}>

            <BackgroundImage></BackgroundImage>

            <View style={styles.imageContainer}>
                <ImageBackground
                    source={require('../img/fondoConNombre.png')}
                    style={styles.fridgeImage}
                    resizeMode="contain"
                >
                    <View style={styles.overlay}>
                        <View style={styles.loginContainer}>
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
                                keyboardType="email-password"
                                secureTextEntry={true}
                            />


                            <ButtonSecondary label="LOGIN" onPress={handleLogin} onPressIn={() => setIsPressed(true)}
                                onPressOut={() => setIsPressed(false)} />
                        </View>

                        <View style={styles.buttonRow}>
                            <ButtonBlue label="Register" onPress={handleRegister} />
                            <ButtonBlue label="Enter as guest" onPress={handleGuest} />
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
        marginTop: 120,
    },
})
