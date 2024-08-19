// Product.jsx
import React, { useState } from 'react'
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native'
import CustomAlert from '../library/CustomAlert'
import deleteProduct from '../logic/deleteProduct'

function Product({ product, drawerId, onProductDeleted }) {
    const [alertVisible, setAlertVisible] = useState(false)

    const handleDeleteProduct = async () => {
        try {
            const productName = await deleteProduct(drawerId, product._id)
            setAlertVisible(false)
            onProductDeleted()
            console.log(`Product '${productName}' deleted successfully`)
        } catch (error) {
            console.error('Error deleting product:', error)
        }
    }

    return (
        <View style={styles.productContainer}>
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productDetails}>Category: {product.category}</Text>
            <Text style={styles.productDetails}>Quantity: {product.quantity}</Text>
            <Text style={styles.productDetails}>Expiration: {new Date(product.expirationDate).toLocaleDateString()}</Text>
            <Text style={styles.productDetails}>Icon: {product.icon}</Text>

            <Pressable onPress={() => setAlertVisible(true)} style={styles.button}>
                <Text style={styles.buttonText}>Delete</Text>
            </Pressable>

            <CustomAlert
                visible={alertVisible}
                title="Delete Product"
                message={`Are you sure you want to delete ${product.name}?`}
                onConfirm={handleDeleteProduct}
                onCancel={() => setAlertVisible(false)}
            />
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
        color: 'black',
    },

    button: {
        backgroundColor: 'rgba(9, 34, 70, 0.4)',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
})

export default Product
