
import React, { useState } from 'react'
import { View, StyleSheet, Dimensions, Platform } from 'react-native'
import { useRouter } from 'expo-router'

import logic from '../logic'
import addFridge from '../logic/addFridge'

const { width } = Dimensions.get('window')

import { BackgroundImage } from './background'
import { ButtonSecondary } from './buttons'
import { Input } from './input'


export default function NewFridge({ userId, onAddFridge, onCancelAddFridge }) { //recibo estas props de home
    const [nameFridge, setNameFridge] = useState('')
    const router = useRouter()

    const handleAddFridge = async () => {

        try {
            await logic.addFridge(userId, nameFridge)
            console.log('Fridge added successfully')
            onAddFridge()
            alert('Success', 'Fridge added successfully!')
        } catch (error) {
            console.error('Error adding fridge:', error)
            alert('Error', 'There was an error adding the fridge.')
        }
    }

    return (
        <View style={styles.container}>
            <BackgroundImage />
            <View style={styles.loginContainer}>
                <Input
                    placeholder="Enter Fridge Name"
                    value={nameFridge}
                    onChangeText={setNameFridge}
                    keyboardType="default"
                />

                <ButtonSecondary
                    label="ADD FRIDGE"
                    onPress={handleAddFridge}
                />

                <ButtonSecondary
                    label="CANCEL"
                    onPress={onCancelAddFridge}
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
    loginContainer: {
        width: '80%',
        padding: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 10,
    },
})
