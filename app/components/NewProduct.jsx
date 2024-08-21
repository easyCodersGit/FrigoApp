

import React, { useState } from 'react'
import { View, Text, StyleSheet, Dimensions, Platform, Pressable, FlatList } from 'react-native'
import { useRouter } from 'expo-router'
import { Picker } from '@react-native-picker/picker'
import DateTimePicker from '@react-native-community/datetimepicker'
import IconMojis from '../library/IconMojis.jsx'

import logic from '../logic'

import { BackgroundImage } from './background'
import { ButtonSecondary } from './buttons'
import { Input } from './input'

const { width } = Dimensions.get('window')

export default function NewProduct({ drawerId, onAddProduct, onCancelProduct }) {
    const [nameProduct, setNameProduct] = useState('')
    const [category, setCategory] = useState('')
    const [selectedEmoji, setSelectedEmoji] = useState('')
    const [quantity, setQuantity] = useState('')
    const [expirationDate, setExpirationDate] = useState(new Date())
    const [showDatePicker, setShowDatePicker] = useState(false)

    const handleAddProduct = async () => {
        console.log('category:', typeof category, category)
        try {
            await logic.addProduct(nameProduct, category, quantity, expirationDate, drawerId, selectedEmoji)
            console.log('Product added successfully')
            onAddProduct()
            onCancelProduct() // un poco cutre pero asi cierra el modal
            alert('Success', 'Product added successfully!')
        } catch (error) {
            console.error('Error adding product:', error)
            alert('Error', 'There was an error adding the product')
        }
    }

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || expirationDate
        setShowDatePicker(Platform.OS === 'ios')
        setExpirationDate(currentDate)
    }

    return (
        <View style={styles.container}>
            <BackgroundImage />
            <View style={styles.productContainer}>
                <Input
                    placeholder="Name"
                    value={nameProduct}
                    onChangeText={setNameProduct}
                    keyboardType="default"
                />

                <Input
                    placeholder="Quantity"
                    value={quantity}
                    onChangeText={setQuantity}
                    keyboardType="default"
                />




                <Picker
                    selectedValue={category}
                    style={styles.picker}
                    onValueChange={(itemValue) => setCategory(itemValue)}
                >
                    <Picker.Item label="Select a category..." value="" />
                    <Picker.Item label="Vegetables" value="vegetables" />
                    <Picker.Item label="Fruits" value="fruits" />
                    <Picker.Item label="Meat" value="meat" />
                    <Picker.Item label="Fish" value="fish" />
                    <Picker.Item label="Dairy" value="dairy" />
                    {/* TODO completar esto, faltan categorias  */}
                </Picker>





                <IconMojis onSelect={setSelectedEmoji} />

                {selectedEmoji && (
                    <Text style={styles.selectedEmoji}>
                        Selected Emoji: {selectedEmoji}
                    </Text>
                )}

                <Pressable
                    style={({ pressed }) => [
                        {
                            padding: 10,
                            marginEnd: 20,
                            backgroundColor: pressed ? '#ddd' : '#2196F3', // Cambia el color cuando está presionado
                            borderRadius: 5,
                            marginTop: 10,
                        },
                    ]}
                    onPress={() => setShowDatePicker(true)}
                >
                    <Text style={{ color: '#fff', textAlign: 'center' }}>Select Expiration Date</Text>
                </Pressable>
                {showDatePicker && (
                    <DateTimePicker
                        value={expirationDate}
                        mode="date"
                        display="default"
                        onChange={handleDateChange}
                    />
                )}




                <ButtonSecondary
                    label="ADD PRODUCT"
                    onPress={handleAddProduct}
                />

                <ButtonSecondary
                    label="CANCEL"
                    onPress={onCancelProduct}
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
        backgroundColor: '#ed1bde',
    },
    productContainer: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: width * 0.9,
        height: 700,
        padding: Platform.OS === 'web' ? 20 : 5,
        borderRadius: 15,

        shadowOpacity: 0.8,

    },
    label: {
        marginTop: Platform.OS === 'web' ? 20 : 5,
        fontSize: 10,
        fontWeight: 'bold',
        color: '#333333',
        textTransform: 'uppercase',
    },
    picker: {
        height: Platform.OS === 'web' ? 60 : 50,
        width: '100%',
        color: '#333333',
        borderRadius: 10,
        marginBottom: Platform.OS === 'web' ? 20 : 120,
    },
    selectedDate: {
        marginTop: 15,
        fontSize: 16,
        color: '#ed1bde',
        fontStyle: 'italic',
        marginBottom: Platform.OS === 'web' ? 20 : 10,
    },
    selectedEmoji: {
        marginTop: 50,
        fontSize: 30,
        color: '#ffcc00',
        textAlign: 'center',
        marginBottom: Platform.OS === 'web' ? 20 : 10,
    },
    input: {
        marginBottom: Platform.OS === 'web' ? 20 : 10,
        width: '100%',
    },
    buttonContainer: {
        marginTop: Platform.OS === 'web' ? 20 : 10,
        marginBottom: 10,
        width: '100%',
        alignItems: 'center',
    },
})


