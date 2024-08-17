import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions, Platform, Pressable, Modal, ActivityIndicator } from 'react-native'

import retrieveProducts from '../logic/retrieveProducts'
import Product from './Product'
import NewProduct from './NewProduct'

const { width } = Dimensions.get('window')

function Drawer(props) {
    const { drawer, onProductAdded } = props
    console.log('Drawer Data:', drawer)

    const [modalVisible, setModalVisible] = useState(false)
    const [products, setProducts] = useState(drawer.products || [])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [showAddProduct, setShowAddProduct] = useState(false)

    const fetchProducts = async () => {
        try {
            setLoading(true)
            const fetchedProducts = await retrieveProducts(drawer._id)
            setProducts(fetchedProducts)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (modalVisible) {
            const fetchProducts = async () => {
                try {
                    setLoading(true)
                    const fetchedProducts = await retrieveProducts(drawer._id)
                    setProducts(fetchedProducts)
                } catch (err) {
                    setError(err.message)
                } finally {
                    setLoading(false)
                }
            }

            fetchProducts()
        }
    }, [modalVisible, drawer._id])

    const handlePress = () => {
        setModalVisible(true)
    }

    const handleClose = () => {
        setModalVisible(false)
    }

    const handleAddProductSuccess = () => {
        setShowAddProduct(false)
        setModalVisible(false)
        fetchProducts()
        if (onProductAdded) {
            onProductAdded()
        }
    }

    return (
        <View style={styles.drawerContainer}>
            <Pressable onPress={handlePress} style={styles.drawerContent}>
                <Text style={styles.drawerName}>{drawer.name}</Text>

                <Text style={styles.productCount}>Products: {products.length}</Text>
            </Pressable>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={handleClose}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>{drawer.name} </Text>
                        <Text style={styles.modalText}>Number of Products: {products.length}</Text>

                        {loading ? (
                            <ActivityIndicator size="large" color="#0000ff" />
                        ) : error ? (
                            <Text style={styles.errorText}>Error: {error}</Text>
                        ) : (
                            products.map(product => <Product key={product._id} product={product} />)
                        )}

                        <Pressable onPress={() => setShowAddProduct(true)} style={styles.button}>
                            <Text style={styles.buttonText}>Add Product</Text>
                        </Pressable>

                        <Pressable onPress={handleClose} style={styles.button}>
                            <Text style={styles.buttonText}>Close</Text>
                        </Pressable>

                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={showAddProduct}
                            onRequestClose={() => setShowAddProduct(false)}
                        >
                            <View style={styles.modalOverlay}>
                                <View style={styles.modalContent}>
                                    <NewProduct drawerId={drawer._id} onAddProduct={handleAddProductSuccess} onCancelProduct={() => setShowAddProduct(false)} />
                                </View>
                            </View>


                        </Modal>


                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    drawerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: Platform.OS === 'web' ? width * 0.3 : width * 0.6,
        margin: 10,
        padding: 10,
        backgroundColor: 'rgba(9, 34, 70, 0.4)',
        borderRadius: 10,
    },
    drawerContent: {
        alignItems: 'center',
    },
    drawerName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 5,
    },
    productCount: {
        fontSize: 14,
        color: '#ddd',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(9, 34, 70, 0.4)',
    },
    modalContent: {
        width: '80%',
        height: '60%',
        backgroundColor: '#ff6347',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalText: {
        fontSize: 16,
        marginBottom: 20,
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
    errorText: {
        color: 'red',
        fontSize: 16,
        marginBottom: 10,
    },
})

export default Drawer