// Importaciones necesarias
import React, { useState, useEffect } from 'react';
import { useRouter, Link } from 'expo-router'
import { View, Text, StyleSheet } from 'react-native';
import session from '../logic/session';
import checkUser from '../logic/checkUser';
import { ButtonBlue, ButtonSecondary } from '../components/buttons';
import { BackgroundImage } from '../components/background';

export default function Home() {
    const [userName, setUserName] = useState(''); // Estado para almacenar el nombre de usuario

    useEffect(() => {
        const fetchUserName = async () => {
            try {
                const userId = await session.getSessionUserId(); // Asegúrate de obtener el userId correctamente
                console.log('Retrieved userId from session:', userId); // Log para verificar el userId

                if (userId) {
                    const name = await checkUser(userId);
                    setUserName(name);
                } else {
                    console.error('No userId found in session');
                }
            } catch (error) {
                console.error('Error fetching user name:', error);
            }
        };

        fetchUserName();
    }, []);// Este efecto se ejecuta solo una vez al montar el componente

    const handlePress = () => {
        alert('Te lleva a Login');
        router.push('/Main')
    };


    const router = useRouter()

    return (
        <View style={styles.container}>
            <BackgroundImage />
            {userName ? (
                <Text style={styles.welcomeText}>Welcome Home, {userName}</Text>
            ) : (
                <Text style={styles.welcomeText}>Loading...</Text>
            )}

            <Link asChild href="/">

                <ButtonSecondary label="LOGIN"></ButtonSecondary>

            </Link>
        </View>
    );
}

// Estilos del componente
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


