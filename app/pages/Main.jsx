// app/pages/Main.jsx
import React, { useState } from 'react';
import { useRouter, Link } from 'expo-router';
import { View, Text, TextInput, Pressable, StyleSheet, ImageBackground } from 'react-native';
import loginUser from '../logic/loginUser';
import { CircleInfoIcon } from '../components/icons';


export function Main() {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isPressed, setIsPressed] = useState(false);

    const router = useRouter();

    const handleLogin = async () => {
        try {
            await loginUser(userId, password);
            setMessage('Login successful!');
            router.push('/Home');
        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../img/fondoApp1.png')}
                style={styles.backgroundImage}
                resizeMode="cover"
            />
            <View style={styles.imageContainer}>
                <ImageBackground
                    source={require('../img/frigolarga.png')}
                    style={styles.fridgeImage}
                    resizeMode="contain"
                >
                    <View style={styles.overlay}>
                        <ImageBackground
                            source={require('../img/iman-polaroid-tibi.png')}
                            style={styles.loginContainer}
                            resizeMode="contain"
                        >
                            <TextInput
                                style={styles.input}
                                placeholder="Enter Email"
                                value={userId}
                                onChangeText={setUserId}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Enter Password"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={true}
                            />
                            <Pressable
                                onPress={handleLogin}
                                onPressIn={() => setIsPressed(true)}
                                onPressOut={() => setIsPressed(false)}
                            >
                                <ImageBackground
                                    source={require('../img/botonLogin.png')}
                                    style={styles.buttonImage}
                                />
                            </Pressable>
                            {message ? <Text style={styles.message}>{message}</Text> : null}
                        </ImageBackground>

                        <View style={styles.buttonRow}>
                            <Pressable style={styles.buttonContainer}>
                                <ImageBackground
                                    source={require('../img/registerWoodButton.png')}
                                    style={styles.registerButton}
                                />
                            </Pressable>
                            <Pressable style={styles.buttonContainer}>
                                <ImageBackground
                                    source={require('../img/guestAsUser.png')}
                                    style={styles.guestButton}
                                />
                            </Pressable>
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
    );
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
        width: 190,
        height: 160,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        color: 'white',
        fontSize: 12,
        height: 30,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 5,
        paddingHorizontal: 10,
        width: 110,
        backgroundColor: 'rgba(65, 70, 70, 0.7)',
    },
    buttonImage: {
        width: 50,
        height: 20,
        top: '110%',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    buttonContainer: {
        marginHorizontal: 10,
    },
    registerButton: {
        width: 125,
        height: 25,
    },
    guestButton: {
        width: 100,
        height: 25,
    },
    message: {
        marginTop: 10,
        fontSize: 18,
        color: '#000',
    },
});
