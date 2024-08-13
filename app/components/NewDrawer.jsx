import React, { useState } from 'react'
import { View, StyleSheet, Dimensions, Platform } from 'react-native'
import { useRouter } from 'expo-router'

import logic from '../logic'

import addDrawer from '../logic/addDrawers'


const { width } = Dimensions.get('window')

import { BackgroundImage } from './background'
import { ButtonSecondary } from './buttons'
import { Input } from './input'

export default function NewDrawer({ fridgeId, onAddDrawer }) {

    const [nameDrawer, setNameDrawer] = useState('')
    //const router = userRouter()

    const handleAddDrawer = async () => {

        try {
            await logic.addDrawer(fridgeId, nameDrawer)
            console.log('Drawer added successfully')
            onAddDrawer()
            alert('Success', 'Drawer added successfully!')
        } catch (error) {
            console.error('Error adding drawer:', error)
            alert('Error', 'There was an error adding the drawer')

        }
    }

    return (
        <View style={styles.container}>
            <BackgroundImage />
            <View style={styles.drawerContainer}>
                <Input
                    placeholder="Enter Drawer Name"
                    value={nameDrawer}
                    onChangeText={setNameDrawer}
                    keyboardType="default"
                />

                <ButtonSecondary
                    label="ADD DRAWER"
                    onPress={handleAddDrawer}
                />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    drawerContainer: {
        width: '80%',
        padding: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 10,
    },
})


