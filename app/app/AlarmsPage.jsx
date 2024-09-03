
import React, { useState, useEffect } from 'react'
import { useRouter } from 'expo-router'
import { ScrollView, View, Text, Pressable, StyleSheet } from 'react-native'
import { Link } from 'expo-router'
import { CircleInfoIcon, OptionsIcon, SearchIcon, LogoutIcon, AlarmIcon, ShopIcon, HomeIcon, FridgeIcon } from '../components/icons'

import { BackgroundImage } from '../components/background'
import Alarms from "../components/Alarms"
import session from '../logic/session'
import checkUser from '../logic/checkUser'



export default function AlarmsPage() {
    const [userId, setUserId] = useState(null)
    const [loading, setLoading] = useState(true)
    const [userName, setUserName] = useState('')



    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const sessionUserId = await session.getSessionUserId()
                console.log('Retrieved userId from session:', sessionUserId)

                if (sessionUserId) {
                    setUserId(sessionUserId)
                    const name = await checkUser(sessionUserId)
                    setUserName(name);
                } else {
                    console.error('No userId found in session')
                }
            } catch (error) {
                console.error('Error fetching user data:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchUserId()
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

            <Text style={styles.title}>{userName} Alarms</Text>

            {userId ? (
                <View style={styles.alarmsContainer}>
                    <Alarms userId={userId} refresh={false} />
                </View>
            ) : (
                <Text>No user ID found.</Text>
            )}
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
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    alarmsContainer: {
        maxHeight: 700,
   
        overflow: 'hidden',
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
        marginBottom: 15
      
    },
})


