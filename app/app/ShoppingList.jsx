
import React, { useState, useEffect } from 'react'
import { useRouter } from 'expo-router'
import { ScrollView, View, Text, Pressable, StyleSheet } from 'react-native'
import { Link } from 'expo-router'
import { CircleInfoIcon, OptionsIcon, SearchIcon, LogoutIcon, AlarmIcon, ShopIcon, HomeIcon, FridgeIcon } from '../components/icons'

import { BackgroundImage } from '../components/background'
import { AlarmIconWithBadge } from '../library/AlarmIconWithBadge'

import Items from '../components/Items'

import retrieveActiveProducts from '../logic/retrieveActiveproducts'
import checkStatusAlarm from '../logic/checkStatusAlarm'
import checkUser from '../logic/checkUser'

import session from '../logic/session'

export default function ShoppingList() {

    const [products, setProducts] = useState([])
    const [userId, setUserId] = useState(null)
    const [loading, setLoading] = useState(true)
    const [userName, setUserName] = useState('')
    const [hasActiveAlarms, setHasActiveAlarms] = useState(false) 

    const router = useRouter()

   
    useEffect(() => {
        const fetchProductsWithAlarms = async () => {
            try {
                const sessionUserId = await session.getSessionUserId()
                console.log('Retrieved userId from session:', sessionUserId)

                if (sessionUserId) {
                    setUserId(sessionUserId)
                    const name = await checkUser(sessionUserId)
                    setUserName(name)
                    const products = await retrieveActiveProducts(sessionUserId)
                    console.log('Active Products:', products)
                    setProducts(products)

                    const alarmStatusChecked = await checkStatusAlarm(sessionUserId)
                    setHasActiveAlarms(alarmStatusChecked)

                } else {
                    console.error('No userId found in session')
                }
            } catch (error) {
                console.error('Error fetching user data:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchProductsWithAlarms()
    }, [])

    if (loading) {
        return <Text>Loading...</Text>
    }

    return (
        <ScrollView contentContainerStyle={styles.contentContainer}>
            <BackgroundImage />

            <View style={styles.buttonContainer}>
                <View style={styles.rightIcons}>
                    <Link asChild href="/Home">
                        <Pressable style={styles.iconButton}>
                            <HomeIcon />
                        </Pressable>
                    </Link>

                    <Pressable
                        style={styles.iconButton}
                        onPress={() => router.push({ pathname: '/AlarmsPage', params: { userId } })}
                    >
                       
                        <AlarmIconWithBadge hasActiveAlarms={hasActiveAlarms} />
                    </Pressable>

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

            {/* Renderizar la lista de productos con alarmas activas */}
            <Text style={styles.welcomeText}>{userName}, You need to buy this!</Text>
            <Items products={products} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    contentContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    welcomeText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        paddingTop: 20,
        paddingBottom: 10
    },
    rightIcons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconButton: {
        marginHorizontal: 10,
    },
    buttonContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        marginBottom: 15,
    },
})