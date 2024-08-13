// Product.jsx
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

function Product({ product }) {
    return (
        <View style={styles.productContainer}>
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productDetails}>Category: {product.category}</Text>
            <Text style={styles.productDetails}>Quantity: {product.quantity}</Text>
            <Text style={styles.productDetails}>Expiration: {new Date(product.expirationDate).toLocaleDateString()}</Text>
            <Text style={styles.productDetails}>Icon: {product.icon}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    productContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    productDetails: {
        fontSize: 14,
        color: '#666',
    },
})

export default Product
