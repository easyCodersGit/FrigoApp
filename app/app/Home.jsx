
import React, { useState, useEffect } from 'react'
import { useRouter, Link } from 'expo-router'
import { View, Text, StyleSheet, Modal, Alert } from 'react-native'

import session from '../logic/session'
import checkUser from '../logic/checkUser'
import { ButtonSecondary } from '../components/buttons'
import { BackgroundImage } from '../components/background'
import Fridges from '../components/Fridges'
import NewFridge from '../components/NewFridge'

export default function Home() {
    const [userName, setUserName] = useState('')
    const [userId, setUserId] = useState(null)
    const [loading, setLoading] = useState(true)
    const [showAddFridge, setShowAddFridge] = useState(false)
    const [fridgeRefreshFlag, setFridgeRefreshFlag] = useState(false)

    const router = useRouter()

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const sessionUserId = await session.getSessionUserId()
                console.log('Retrieved userId from session:', sessionUserId)

                if (sessionUserId) {
                    setUserId(sessionUserId)
                    const name = await checkUser(sessionUserId)
                    setUserName(name)
                } else {
                    console.error('No userId found in session')
                }
            } catch (error) {
                console.error('Error fetching user data:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchUserData()
    }, [])

    const handleAddFridgeSuccess = () => {
        console.log('handleAddFridgeSuccess called')
        setFridgeRefreshFlag(!fridgeRefreshFlag) // Toggle para actualizar el componente Fridges
        setShowAddFridge(false) // Cierra el modal
    }

    const handleCancelAddFridge = () => {
        setShowAddFridge(false) // Cierra el modal
    }

    return (
        <View style={styles.container}>
            <BackgroundImage />
            {loading ? (
                <Text style={styles.welcomeText}>Loading...</Text>
            ) : (
                <>
                    {userName ? (
                        <Text style={styles.welcomeText}>Welcome Home, {userName}</Text>
                    ) : (
                        <Text style={styles.errorText}>Error loading user data</Text>
                    )}

                    {/* Renderiza las neveras si userId está disponible */}
                    {userId && <Fridges userId={userId} refresh={fridgeRefreshFlag} />}

                    <ButtonSecondary
                        label="Add Fridge"
                        onPress={() => setShowAddFridge(true)} // Muestra el modal para añadir nevera
                    />

                    <Link asChild href="/">
                        <ButtonSecondary label="LOGIN" />
                    </Link>

                    <Modal
                        visible={showAddFridge}
                        animationType="slide"
                        onRequestClose={() => setShowAddFridge(false)}
                    >
                        <NewFridge userId={userId} onAddFridge={handleAddFridgeSuccess} onCancelAddFridge={handleCancelAddFridge} />
                    </Modal>
                </>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
})

