
import React, { useState } from 'react'
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native'
import CheckBox from "expo-checkbox"
import { DeleteIcon } from './icons'

const { width } = Dimensions.get('window')

export default function Item({ product, onDelete }) {
    const [isChecked, setIsChecked] = useState(false)

    return (
        <View style={styles.itemContainer}>
            <CheckBox
                value={isChecked}
                onValueChange={(newValue) => setIsChecked(newValue)}
                style={styles.checkbox}
            />
            <View style={styles.textContainer}>
                <Text style={styles.itemName}>{product.name}</Text>
                <Text style={styles.itemQuantity}>Quantity: {product.minimumQuantity}</Text>
                
            </View>
            <Pressable onPress={() => onDelete(product.id)} style={styles.deleteButton}>
                <DeleteIcon />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',  
        alignItems: 'center',   
        justifyContent: 'space-between',  
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#f8f8f8',
        borderRadius: 8,
        // width: '40%', 
        width: 300,
        alignSelf: 'center',
    },
    textContainer: {
        flex: 1,  
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    itemQuantity: {
        fontSize: 14,
        color: '#555',
    },
    checkbox: {
        marginRight: 10,
    },
    deleteButton: {
        marginLeft: 10,
    },
})




