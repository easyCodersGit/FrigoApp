import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'expo-router'
import { useRouter } from 'expo-router'
import { ScrollView } from "react-native"
import { View, Text, TextInput, Pressable, StyleSheet, Image } from 'react-native'
import { Link } from 'expo-router'
import { HomeIcon } from "../components/icons"

import { BackgroundImage } from '../components/background'
import Alarms from "../components/Alarms"
import session from '../logic/session'

export default function AlarmsPage() {
    const [userId, setUserId] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchUserId = async () => {
            const storedUserId = await session.getSessionUserId()
            if (storedUserId) {
                setUserId(storedUserId)
            } else {
                console.error('No userId found in session')
            }
            setLoading(false)
        }

        fetchUserId()
    }, [])

    if (loading) {
        return <Text>Loading...</Text>
    }

    return (
        <ScrollView>
            <BackgroundImage />
            <Text>Aquí estarán las alarmas</Text>

            <View style={styles.container}>
                <Text style={styles.title}>User Alarms</Text>
                {userId ? (
                    <Alarms userId={userId} refresh={false} />
                ) : (
                    <Text>No user ID found.</Text>
                )}
            </View>

            <Link asChild href="/Home">
                <Pressable>
                    <HomeIcon />
                </Pressable>
            </Link>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
})