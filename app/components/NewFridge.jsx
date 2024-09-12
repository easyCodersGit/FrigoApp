
import React, { useState } from 'react'
import { View, StyleSheet, Dimensions, Platform, Pressable, Text } from 'react-native'
import { useRouter } from 'expo-router'

import logic from '../logic'
import addFridge from '../logic/addFridge'

const { width } = Dimensions.get('window')

import { BackgroundImage } from './background'
import { ButtonSecondary } from './buttons'
import { Input } from './input'

export default function NewFridge({ userId, onAddFridge, onCancelAddFridge }) {
    const [nameFridge, setNameFridge] = useState('')
    const [colorFridge, setColorFridge] = useState('orange') 
    const router = useRouter()

    const handleAddFridge = async () => {
        try {
            await logic.addFridge(userId, nameFridge, colorFridge)
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
                    style={[styles.input, { width: 250 }]}
                />

                <View style={styles.colorOptions}>
                    <Pressable 
                        style={[styles.colorOption, colorFridge === 'red' && styles.selectedColor]}
                        onPress={() => setColorFridge('red')}
                    >
                        <Text style={styles.colorText}>Red</Text>
                    </Pressable>
                    <Pressable 
                        style={[styles.colorOption, colorFridge === 'blue' && styles.selectedColor]}
                        onPress={() => setColorFridge('blue')}
                    >
                        <Text style={styles.colorText}>Blue</Text>
                    </Pressable>
                    <Pressable 
                        style={[styles.colorOption, colorFridge === 'orange' && styles.selectedColor]}
                        onPress={() => setColorFridge('orange')}
                    >
                        <Text style={styles.colorText}>Orange</Text>
                    </Pressable>
                </View>

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
    colorOptions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 20,
    },
    colorOption: {
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    selectedColor: {
        borderColor: '#000',
    },
    colorText: {
        fontSize: 16,
    },
    input: {
        textAlign: 'center',
        fontSize: 18, 
    },
})
