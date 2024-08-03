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
                >
                    {/* Contenido que forma parte de la nevera */}
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

                        {/* Botones debajo del formulario */}
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
        flexDirection: 'row', // Coloca los botones en una fila
        justifyContent: 'space-around', // Espacio entre los botones
        marginTop: 20, // Espacio entre el formulario y los botones
    },
    buttonContainer: {
        marginHorizontal: 10, // Espacio lateral entre botones
    },
    registerButton: {
        width: 125, // Ajusta el tamaño del botón de registro según sea necesario
        height: 25, // Ajusta el tamaño del botón de registro según sea necesario
    },
    guestButton: {
        width: 100, // Ajusta el tamaño del botón de invitado según sea necesario
        height: 100, // Ajusta el tamaño del botón de invitado según sea necesario
    },
    message: {
        marginTop: 10,
        fontSize: 18,
        color: '#000',
    },
});
