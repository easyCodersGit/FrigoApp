// Item.js
import React, { useState } from 'react'
import { View, Text, StyleSheet} from 'react-native'
import CheckBox from "expo-checkbox"

export default function Item({ product }) {
    const [isChecked, setIsChecked] = useState(false)

    return (
         <View style={styles.itemContainer}>
            <CheckBox
                value={isChecked}
                onValueChange={(newValue) => setIsChecked(newValue)} 
                style={styles.checkbox}
            />
            <View>
                <Text style={styles.itemName}>{product.name}</Text>
                <Text style={styles.itemQuantity}>Quantity: {product.minimumQuantity}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row', 
        alignItems: 'center', 
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#f8f8f8',
        borderRadius: 8,
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
})



