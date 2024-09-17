
import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, Alert, Platform, ImageBackground, Dimensions, Modal, Pressable } from 'react-native'
import { useRouter, useLocalSearchParams, Link } from 'expo-router'
import retrieveFridge from '../../logic/retrieveFridge'
import { ButtonSecondary } from '../../components/buttons'
import { BackgroundImage } from '../../components/background'
import Drawers from '../../components/Drawers'
import NewDrawer from '../../components/NewDrawer'
import { AlarmIconWithBadge } from '../../library/AlarmIconWithBadge'
import checkStatusAlarm from '../../logic/checkStatusAlarm'
import { CircleInfoIcon, OptionsIcon, SearchIcon, LogoutIcon, AlarmIcon, ShopIcon, HomeIcon, FridgeIcon } from '../../components/icons'

const { width } = Dimensions.get('window')

function FridgeMain() {
    const { id, userId } = useLocalSearchParams()
    const router = useRouter()

    const [fridgeData, setFridgeData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [showAddDrawer, setShowAddDrawer] = useState(false)
    const [drawerRefreshFlag, setDrawerRefreshFlag] = useState(false)
    const [hasActiveAlarms, setHasActiveAlarms] = useState(false)

    useEffect(() => {
        const loadFridgeData = async () => {
            try {
                const data = await retrieveFridge(id)
                console.log("Fridge Data: ", data)
                setFridgeData(data)
            } catch (err) {
                setError(err.message)
                Alert.alert('Error', `No se pudo cargar la nevera: ${err.message}`)
            } finally {
                setLoading(false)
            }
        }

        loadFridgeData()

        const checkAlarms = async () => {
            if (userId) {
                const alarmStatusChecked = await checkStatusAlarm(userId)
                setHasActiveAlarms(alarmStatusChecked)
            }
        }

        checkAlarms()

    }, [id, drawerRefreshFlag, userId])

    const handleAddDrawerSuccess = () => {
        setDrawerRefreshFlag(!drawerRefreshFlag)
        setShowAddDrawer(false)
    }

    const handleAddProductSuccess = () => {
        setDrawerRefreshFlag(!drawerRefreshFlag)
    }

    const handleCancelDrawer = () => {
        setShowAddDrawer(false)
    }

    const handlerGoFridges = () => {
        router.push('/Home')
    }

    const updateAlarmStatus = async () => {
        if (userId) {
            const alarmStatusChecked = await checkStatusAlarm(userId)
            setHasActiveAlarms(alarmStatusChecked)
        }
    }

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />
       
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Error al cargar la nevera</Text>
                <Text>{error}</Text>
            </View>
        )
    }

    return (
        <View contentContainerStyle={styles.scrollContainer}>
            <BackgroundImage />


            <ImageBackground
                source={require('../../img/bordeNevera3.png')}
                style={styles.fridgeImage}
            >
                 <View style={styles.rightIcons}>
                  



            <Link asChild href="/Home">
                <Pressable style={styles.iconButton}>
                    <HomeIcon />
                </Pressable>
            </Link>

            <Pressable
                        style={styles.iconButton}
                        // onPress={() => router.push({ pathname: '/AlarmsPage', params: { userId } })}
                        onPress={() =>router.push('/AlarmsPage')}
                    >
                      
                        <AlarmIconWithBadge hasActiveAlarms={hasActiveAlarms} />
                    </Pressable>

           

           
                <Pressable style={styles.iconButton} onPress={handlerGoFridges}>
                    <ShopIcon />
                </Pressable>
           

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
                <View style={styles.innerContainer}>
                    <Text style={styles.title}>{fridgeData.name}</Text>
                    {/* <Text style={styles.subtitle}>Haz click en el cajón para ver su contenido y modificarlo!</Text> */}
                    <Drawers style={styles.drawers} fridgeId={id} refreshFlag={drawerRefreshFlag} onProductAdded={handleAddProductSuccess} updateAlarmStatus={updateAlarmStatus} />

                    <View style={styles.buttonsContainer}>
                    <ButtonSecondary
                            label="Add Drawer"
                            onPress={() => setShowAddDrawer(true)}
                        />
                      
                        
                    </View>

                    <Modal
                        visible={showAddDrawer}
                        animationType="slide"
                        onRequestClose={() => setShowAddDrawer(false)}
                    >
                        <NewDrawer fridgeId={id} onAddDrawer={handleAddDrawerSuccess} onCancelDrawer={handleCancelDrawer} />
                    </Modal>
                </View>
            </ImageBackground>
        </View>
    )


    
    
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
       
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        marginLeft: 60,
        marginRight: 60

    },
    fridgeImage: {
        width: Platform.OS === 'web' ? '100%' : '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,


    },
    innerContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginTop: Platform.OS === 'web' ? 30 : 50,
        height: 700,

    },
    buttonsContainer: {

        alignItems: 'center',
        justifyContent: 'center',

        marginTop: Platform.OS === 'web' ? 20 : 10,
        marginBottom: Platform.OS === 'web' ? 0 : 60,

    },


    imageStyle: {
        resizeMode: 'contain',
    },

    fridgeButton: {
        marginBottom: 50,
    },
    rightIcons: {
        flexDirection: 'row', 
        alignItems: 'center', 
    },
    iconButton: {
        marginHorizontal: 10, 
    },
})

export default FridgeMain








