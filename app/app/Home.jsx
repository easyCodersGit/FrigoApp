
import React, { useState, useEffect } from 'react'
import { useRouter, Link } from 'expo-router'
import { View, Text, StyleSheet, Modal, Alert, Pressable, ImageBackground, Platform, SafeAreaView } from 'react-native'

import { CircleInfoIcon, OptionsIcon, SearchIcon, LogoutIcon, AlarmIcon, ShopIcon } from '../components/icons'

import session from '../logic/session'
import checkUser from '../logic/checkUser'
import { ButtonSecondary } from '../components/buttons'
import { BackgroundImage } from '../components/background'
import Fridges from '../components/Fridges'
import NewFridge from '../components/NewFridge'
import CustomInput from '../library/CustomInput'
import searchProduct from '../logic/searchproduct'
import checkStatusAlarm from '../logic/checkStatusAlarm'
import { AlarmIconWithBadge } from '../library/AlarmIconWithBadge'


export default function Home() {
    const [userName, setUserName] = useState('')
    const [userId, setUserId] = useState(null)
    const [loading, setLoading] = useState(true)
    const [hasActiveAlarms, setHasActiveAlarms] = useState(false) 
    const [showAddFridge, setShowAddFridge] = useState(false)
    const [fridgeRefreshFlag, setFridgeRefreshFlag] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [searchResult, setSearchResult] = useState(null)
    const [showModal, setShowModal] = useState(false)

    const router = useRouter()

   let sessionUserId

  

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
                    console.log('Retrieved userId from session:', sessionUserId)
    
                    // Pasa el token a checkUser y otras funciones protegidas
                    console.log('Calling checkUser with userId and token:', sessionUserId, token)
                    const name = await checkUser(sessionUserId, token)
                    console.log('User name retrieved:', name)
                    setUserName(name)
    
                    console.log('Calling checkStatusAlarm with userId and token:', sessionUserId, token)
                    const alarmStatusChecked = await checkStatusAlarm(sessionUserId, token)
                    setHasActiveAlarms(alarmStatusChecked)
                    console.log('Alarm status checked:', alarmStatusChecked)
    
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
        setFridgeRefreshFlag(!fridgeRefreshFlag) 
        setShowAddFridge(false) 
    }

    const handleCancelAddFridge = () => {
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

    return (
        <View style={styles.container}>
             {/* <SafeAreaView style={{ flex: 1 }}> */}
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
                        <NewFridge userId={userId} onAddFridge={handleAddFridgeSuccess} onCancelAddFridge={handleCancelAddFridge} />
                    </Modal>

                    {/* Modal para mostrar los resultados de la búsqueda */}
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
                                        {/* <Text style={styles.modalText}>Product: {item.product}</Text> */}
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
            {/* </SafeAreaView> */}
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
   
})

