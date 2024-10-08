import React, { useState } from 'react'
import { useRouter, Link } from 'expo-router'
import { View, TextInput, Pressable, StyleSheet, ImageBackground } from 'react-native'
import loginUser from '../logic/loginUser'
import { CircleInfoIcon, OptionsIcon, SearchIcon } from '../components/icons'
import { ButtonBlue, ButtonSecondary } from '../components/buttons'
import { Input } from '../components/input'
import { BackgroundImage } from '../components/background'

export function Main() {
    const [userId, setUserId] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [isPressed, setIsPressed] = useState(false)
    const [guestModalVisible, setGuestModalVisible] = useState(false)

    const router = useRouter()

    const handleRegister = () => {
        
        router.push('/Register')
    }

    const handleGuest = async () => {
        try {
          
            const guestEmail = 'guest@email.com'
            const guestPassword = 'password123'

            console.log('Attempting guest login')

            await loginUser(guestEmail, guestPassword)

            setMessage('Guest login successful!')
            setGuestModalVisible(true);  // Aquí activas el modal
            router.push({ pathname: '/Home', params: { guestModalVisible: true } })

        } catch (error) {
            console.error('Error logging in as guest:', error)
        }
    }

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
                                placeholder="Enter Email"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                width={170} 
                            />

                            <Input
                                placeholder="Enter Password"
                                value={password}
                                onChangeText={setPassword}
                                keyboardType="default"
                                secureTextEntry={true}
                                width={170} 
                            />

                          
                        </View>

                        <View style={styles.buttonLogin}>
                        <ButtonSecondary
                                label="LOGIN"
                                onPress={handleLogin}
                                onPressIn={() => setIsPressed(true)}
                                onPressOut={() => setIsPressed(false)}
                            />
                        </View>

                        <View style={styles.buttonRow}>
                            <ButtonBlue label="Register" onPress={handleRegister} />
                            <ButtonBlue label="Enter as guest" onPress={handleGuest} />
                        </View>
                    </View>
                </ImageBackground>
            </View>

            {/* <Link asChild href="/about">
                <Pressable>
                    <CircleInfoIcon />
                </Pressable>
            </Link> */}
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
