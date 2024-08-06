// Importaciones necesarias
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import session from '../logic/session';
import checkUser from '../logic/checkUser';
import { ButtonBlue } from '../components/buttons';
import { LateralScroll } from '../components/LateralScroll'
import { Input } from '../components/input'
import { BackgroundImage } from '../components/background'

export default function Home() {

    const [userName, setUserName] = useState('')



    const handlePress = () => {
        alert("Estas en Home")
    }


    useEffect(() => {
        const fetchUserName = async () => {
            try {
                const name = await checkUser(session.sessionUserId);
                setUserName(name);
            } catch (error) {
                console.error(error)
            }
        };

        fetchUserName()
    }, [])

    return (
        <View style={styles.container}>
            <BackgroundImage></BackgroundImage>
            {userName ? (
                <Text style={styles.welcomeText}>Welcome Home, {userName}</Text>
            ) : (
                <Text style={styles.welcomeText}>Loading...</Text>
            )}

            <ButtonBlue label="Presiona Aquí" onPress={handlePress} />



        </View>
    )
}

// Estilos
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    errorText: {
        fontSize: 18,
        color: 'red',
        marginTop: 10,
    },
});

