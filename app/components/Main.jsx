// Importaciones necesarias
import React, { useState } from 'react';
import { Link } from 'expo-router';
import { View, Text, TextInput, Pressable, StyleSheet, ImageBackground } from 'react-native';
import logic from '../logic';
import { CircleInfoIcon } from './icons';

// Componente principal
export function Main() {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isPressed, setIsPressed] = useState(false);

    const handleCheckUser = async () => {

        const userName = await logic.checkUser(userId);
        if (userName) {
            setMessage(`Welcome ${userName}`);
        } else {
            setMessage('Welcome stranger, please register');
        }
    };

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../img/fondoApp1.png')}
                style={styles.backgroundImage}
                resizeMode='cover'
            />
            <View style={styles.imageContainer}>
                <ImageBackground
                    source={require('../img/frigolarga.png')}
                    style={styles.fridgeImage}
                    resizeMode='contain'
                />
            </View>
            <View style={styles.overlay}>
                <ImageBackground
                    source={require('../img/iman-polaroid-tibi.png')}
                    style={styles.loginContainer}
                    resizeMode='contain'
                >
                    {/* Formulario de inicio de sesión */}
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
                        onPress={handleCheckUser}
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
            </View>
            <Link asChild href="/about">
                <Pressable>
                    <CircleInfoIcon />
                </Pressable>
            </Link>
        </View>
    );
}

// Estilos
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
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginContainer: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -45 }, { translateY: -60 }],
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
        // marginTop: 10,
        top: '110%',
    },
    message: {
        marginTop: 10,
        fontSize: 18,
        color: '#000',
    },
});
