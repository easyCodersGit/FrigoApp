

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
            //alert('Success', 'Product added successfully!')
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
                    <Picker.Item label="Select a category..." value=""  />
                    <Picker.Item label="Vegetables" value="vegetables" />
                    <Picker.Item label="Fruits" value="fruits" />
                    <Picker.Item label="Meat" value="meat" />
                    <Picker.Item label="Fish" value="fish" />
                    <Picker.Item label="Seafood" value="seafood" />
                    <Picker.Item label="Dairy" value="dairy" />
                    <Picker.Item label="Grains" value="grains" />
                    <Picker.Item label="Nuts and Seeds" value="nuts and seeds" />
                    <Picker.Item label="Legumes" value="legumes" />
                    <Picker.Item label="Sweets" value="sweets" />
                    <Picker.Item label="Beverages" value="beverages" />
                    <Picker.Item label="Spices and Herbs" value="spices and herbs" />
                    <Picker.Item label="Baked Goods" value="baked goods" />
                    <Picker.Item label="Condiment and Sauces" value="condiment and sauces" />
                    <Picker.Item label="Snacks" value="snacks" />
                    <Picker.Item label="Fats and Oils" value="fats and oils" />
                    <Picker.Item label="Frozen Foods" value="frozen foods" />
                    <Picker.Item label="Canned Goods" value="canned goods" />
                   
                </Picker>

                <View style={styles.emojiScrollContainer}>
                    <IconMojis onSelect={setSelectedEmoji} selectedEmoji={selectedEmoji} />
                </View>     

                <Pressable
                    style={({ pressed }) => [
                        {
                            padding: 10,
                            marginEnd: 20,
                            backgroundColor: pressed ? '#ddd' : '#2196F3', 
                            borderRadius: 5,
                            marginTop: 5,
                            marginBottom: 20
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
        height: 750,
        padding: Platform.OS === 'web' ? 20 : 5,
        borderRadius: 15,
        backgroundColor: 'rgba(9, 34, 70, 0.2)',

        shadowColor: '#000', 
        shadowOffset: {
            width: 0, 
            height: 2, 
        },
        shadowOpacity: 0.25, 
        shadowRadius: 3.84,   
        elevation: 5,

    },
    label: {
        marginTop: Platform.OS === 'web' ? 20 : 5,
        fontSize: 10,
        fontWeight: 'bold',
        color: 'red',
        textTransform: 'uppercase',
    },
    picker: {
        height: Platform.OS === 'web' ? 60 : 50,
        width: '100%',
        color: 'white',
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
    emojiScrollContainer: {
        maxHeight: 280, 
        marginBottom: 15, 
        overflow: 'hidden', 
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


