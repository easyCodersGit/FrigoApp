
import React, { useState, useEffect } from 'react'
import { useRouter, Link } from 'expo-router'
import { View, Text, StyleSheet, Modal, Alert, Pressable } from 'react-native'

import { CircleInfoIcon, OptionsIcon, SearchIcon, LogoutIcon, AlarmIcon, ShopIcon } from '../components/icons'

import session from '../logic/session'
import checkUser from '../logic/checkUser'
import { ButtonSecondary } from '../components/buttons'
import { BackgroundImage } from '../components/background'
import Fridges from '../components/Fridges'
import NewFridge from '../components/NewFridge'
import CustomInput from '../library/CustomInput'

export default function Home() {
    const [userName, setUserName] = useState('')
    const [userId, setUserId] = useState(null)
    const [loading, setLoading] = useState(true)
    const [showAddFridge, setShowAddFridge] = useState(false)
    const [fridgeRefreshFlag, setFridgeRefreshFlag] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')

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
        setShowAddFridge(false)
    }

    return (
        <View style={styles.container}>
            <BackgroundImage />
            <View style={styles.buttonContainer}>

               

            <View style={styles.searchContainer}>
                    <CustomInput
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        placeholder="Search product..."
                        style={styles.searchInput}
                    />
                    <Link asChild href="/about">
                        <Pressable style={styles.iconSearchButton}>
                            <SearchIcon />
                        </Pressable>
                    </Link>
                </View>

                <View style={styles.rightIcons}>

                    <Link asChild href="/about">
                        <Pressable style={styles.iconButton}>
                            <AlarmIcon />
                        </Pressable>
                    </Link>

                    <Link asChild href="/about">
                        <Pressable style={styles.iconButton}>
                            <ShopIcon />
                        </Pressable>
                    </Link>

                    <Link asChild href="/about">
                        <Pressable style={styles.iconButton}>
                            <OptionsIcon />
                        </Pressable>
                    </Link>

                    <Link asChild href="/">
                        <Pressable style={styles.iconButton}>
                            <LogoutIcon />
                        </Pressable>
                    </Link>
                </View>
            </View>

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
                        onPress={() => setShowAddFridge(true)}
                    />

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
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        paddingTop: 20,
        paddingBottom: 10
    },
    errorText: {
        fontSize: 18,
        color: 'red',
        marginTop: 10,
    },

    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%', 
        paddingHorizontal: 20, 
    
    },

    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        paddingRight: 60
    },
    rightIcons: {
        flexDirection: 'row', 
        alignItems: 'center', 
    },
    iconButton: {
        marginHorizontal: 10, 
    },
    iconSearchButton: {
        marginLeft: 5,
    },
    searchInput: {
        flex: 1,
        marginRight: 5, 
    }
})

