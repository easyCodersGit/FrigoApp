
import React, { useState, useEffect } from 'react'
import { useRouter, useLocalSearchParams, Link } from 'expo-router'
import { View, Text, StyleSheet, Modal, Pressable } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import session from '../logic/session'
import checkUser from '../logic/checkUser'
import { ButtonSecondary } from '../components/buttons'
import { BackgroundImage } from '../components/background'
import Fridges from '../components/Fridges'
import NewFridge from '../components/NewFridge'
import CustomInput from '../library/CustomInput'
import searchProduct from '../logic/searchproduct'
import checkStatusAlarm from '../logic/checkStatusAlarm'
import deleteGuestFridge from '../logic/deleteGuestFridge'
import logoutUser from '../logic/logoutUser'
import { AlarmIconWithBadge } from '../library/AlarmIconWithBadge'
import { CircleInfoIcon, OptionsIcon, SearchIcon, LogoutIcon, AlarmIcon, ShopIcon} from '../components/icons'

export default function Home() {
    const { guestModalVisible: guestModalVisibleParam } = useLocalSearchParams()
    const [userName, setUserName] = useState('')
    const [userId, setUserId] = useState(null)
    const [loading, setLoading] = useState(true)
    const [hasActiveAlarms, setHasActiveAlarms] = useState(false)
    const [showAddFridge, setShowAddFridge] = useState(false)
    const [fridgeRefreshFlag, setFridgeRefreshFlag] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [searchResult, setSearchResult] = useState(null)
    const [guestModalVisible, setGuestModalVisible] = useState(guestModalVisibleParam === 'true')
    const [showModal, setShowModal] = useState(false)
    
    const router = useRouter()

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                console.log('Fetching session userId and token')
                const sessionUserId = await session.getSessionUserId()
                const token = await session.getSessionToken()

                if (!token) {
                    console.error('No token found in session')
                    return
                }

                if (sessionUserId) {
                    setUserId(sessionUserId)

                    const name = await checkUser(sessionUserId, token)
                    setUserName(name)

                    
                    if (sessionUserId === '66cb11d2a7f1c48e5602c7a1' && !await AsyncStorage.getItem('guestModalShown')) {
                        console.log('Guest session started, showing modal')
                        await session.setSessionStartTime(Date.now().toString())
                        setGuestModalVisible(true)
                        await AsyncStorage.setItem('guestModalShown', 'true')
                    }

                    const alarmStatusChecked = await checkStatusAlarm(sessionUserId, token)
                    setHasActiveAlarms(alarmStatusChecked)
                }
            } catch (error) {
                console.error('Error fetching user data:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchUserData()
    }, [])

    const resetToInitialState = async () => {
        console.log('Entrando a reset state')

        alert('Your time is up! We hope you enjoyed trying out the app. Please register to enjoy all features without restrictions.')

        try {
            await deleteGuestFridge('66cb11d2a7f1c48e5602c7a1')
            await session.removeSessionStartTime()
            await logoutUser()
            await AsyncStorage.removeItem('guestModalShown')
            setTimeout(() => {
                router.push('/')
            }, 3000)
        } catch (error) {
            console.error('Error resetting to initial state:', error)
        }
    }

    const handleAddFridgeSuccess = () => {
        setFridgeRefreshFlag(!fridgeRefreshFlag)
        setShowAddFridge(false)
    }

    const handleSearchProduct = async () => {
        try {
            const result = await searchProduct(userId, searchQuery)
            setSearchResult(result)
        } catch (error) {
            console.error('Error searching for product:', error)
            setSearchResult({ message: error.message, data: [] })
        } finally {
            setShowModal(true)
        }
    }

    const closeModal = () => {
        setShowModal(false)
    }

    const closeGuestModal = () => {
        setGuestModalVisible(false)
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
                    <Pressable style={styles.iconSearchButton} onPress={handleSearchProduct}>
                        <SearchIcon />
                    </Pressable>
                </View>

                <View style={styles.rightIcons}>
                    <Pressable
                        style={styles.iconButton}
                        onPress={() => router.push({ pathname: '/AlarmsPage', params: { userId } })}
                    >
                        <AlarmIconWithBadge hasActiveAlarms={hasActiveAlarms} />
                    </Pressable>

                    <Link asChild href="/ShoppingList">
                        <Pressable style={styles.iconButton}>
                            <ShopIcon />
                        </Pressable>
                    </Link>

                    <Link asChild href="/Profile">
                        <Pressable style={styles.iconButton}>
                            <OptionsIcon />
                        </Pressable>
                    </Link>

                    <Link asChild href="/">
                        <Pressable
                            style={styles.iconButton}
                            onPress={async () => {
                                await logoutUser();
                                router.push('/');
                            }}
                        >
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

                    {userId && <Fridges userId={userId} refresh={fridgeRefreshFlag} hasActiveAlarms={hasActiveAlarms} />}

                    <ButtonSecondary
                        label="Add Fridge"
                        onPress={() => setShowAddFridge(true)}
                    />

                    <Modal
                        visible={showAddFridge}
                        animationType="slide"
                        onRequestClose={() => setShowAddFridge(false)}
                    >
                        <NewFridge userId={userId} onAddFridge={handleAddFridgeSuccess} onCancelAddFridge={() => setShowAddFridge(false)} />
                    </Modal>

                    <Modal
                        visible={guestModalVisible}
                        animationType="slide"
                        onRequestClose={closeGuestModal}
                        transparent={true}
                    >
                        <View style={styles.guestModalOverlay}>
                            <View style={styles.guestModalContent}>
                                <Text style={styles.modalTitle}>Welcome, Guest User!</Text>
                                <Text style={styles.modalText}>
                                    You have 15 minutes to explore and try out the app. During this time, you can create fridges, drawers, add food items, and set alarms. However, when the time runs out, all the changes you’ve made will be lost.
                                </Text>
                                <Text style={styles.modalText}>
                                    You will not be able to delete the pre-existing "Guest Fridge" fridge, nor the drawers and food items it contains. But feel free to delete anything new that you create.
                                </Text>
                                <Pressable style={styles.modalButton} onPress={closeGuestModal}>
                                    <Text style={styles.modalButtonText}>Got it!</Text>
                                </Pressable>
                            </View>
                        </View>
                    </Modal>

                    <Modal
                        visible={showModal}
                        animationType="slide"
                        onRequestClose={closeModal}
                    >
                        <View style={styles.modalContainer}>
                            <BackgroundImage />
                            <Text style={styles.modalTitle}>Search Results</Text>
                            {searchResult ? (
                                <View>
                                    {searchResult.data && searchResult.data.length > 0 ? (
                                        searchResult.data.map((item, index) => (
                                            <View key={index} style={styles.resultItem}>
                                                <Text style={styles.modalText}>Fridge Name: {item.fridge}</Text>
                                                <Text style={styles.modalText}>Drawer: {item.drawer}</Text>
                                                <Text style={styles.modalText}>Quantity: {item.quantity}</Text>
                                            </View>
                                        ))
                                    ) : (
                                        <Text style={styles.modalText}>{searchResult.message || 'No results found'}</Text>
                                    )}
                                </View>
                            ) : (
                                <Text style={styles.modalText}>No results found</Text>
                            )}
                            <Pressable style={styles.modalButton} onPress={closeModal}>
                                <Text style={styles.modalButtonText}>Close</Text>
                            </Pressable>
                        </View>
                    </Modal>
                </>
            )}
        </View>
    );
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
        paddingBottom: 10,
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
        paddingRight: 60,
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
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalText: {
        fontSize: 16,
        marginVertical: 5,
    },
    resultItem: {
        marginBottom: 10,
    },
    modalButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#007BFF',
        borderRadius: 5,
    },
    modalButtonText: {
        color: '#FFF',
        fontSize: 16,
    },
    guestModalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    guestModalContent: {
        width: '80%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
})
