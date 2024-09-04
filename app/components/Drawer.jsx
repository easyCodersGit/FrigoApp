

import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions, Platform, Pressable, Modal, ActivityIndicator, ScrollView } from 'react-native'

import retrieveProducts from '../logic/retrieveProducts'
import Product from './Product'
import NewProduct from './NewProduct'

import CustomAlert from '../library/CustomAlert'
import deleteDrawer from '../logic/deleteDrawer'

const { width } = Dimensions.get('window')

function Drawer(props) {
    const { drawer, fridge, onDrawerDeleted, updateAlarmStatus } = props
    console.log('Drawer Data:', drawer)

    const [modalVisible, setModalVisible] = useState(false)
    const [products, setProducts] = useState(drawer.products || [])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [showAddProduct, setShowAddProduct] = useState(false)
    const [alertVisible, setAlertVisible] = useState(false)

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
            fetchProducts()
        }
    }, [modalVisible, drawer._id])

    const handlePress = () => {
        setModalVisible(true)
    }

    const handleClose = () => {
        updateAlarmStatus()
        setModalVisible(false)
    }

    const handleDeleteDrawer = async () => {
        try {
            const drawerName = await deleteDrawer(fridge._id, drawer._id)
            setAlertVisible(false)
            onDrawerDeleted() // Llamada para actualizar la lista de cajones
            console.log(`Drawer '${drawerName}' deleted successfully`)
        } catch (error) {
            console.error('Error deleting drawer:', error)
        }
    }

    return (
        <View style={styles.drawerContainer}>
            <Pressable onPress={handlePress} style={styles.drawerContent}>
                <Text style={styles.drawerName}>{drawer.name}</Text>
                {/* <Text style={styles.productCount}>Products: {products.length}</Text> */}

                <View style={styles.productIconsContainer}>
                    {products.map((product) => (
                        <Text key={product._id} style={styles.productIcon}>
                            {product.icon || '❓'} {/* Muestra un emoji por defecto si no hay icono */}
                        </Text>
                    ))}
                </View>
                
                <Pressable onPress={() => setAlertVisible(true)} style={styles.button}>
                    <Text style={styles.buttonText}>Delete Drawer</Text>
                </Pressable>

                <CustomAlert
                    visible={alertVisible}
                    title="Delete Drawer"
                    message={`Are you sure you want to delete ${drawer.name}?`}
                    onConfirm={handleDeleteDrawer}
                    onCancel={() => setAlertVisible(false)}
                />
            </Pressable>
            <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}
    onRequestClose={handleClose}
>
    <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{drawer.name}</Text>
            <Text style={styles.modalText}>Number of Products: {products.length}</Text>

            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : error ? (
                <Text style={styles.errorText}>Error: {error}</Text>
            ) : (
                <View style={styles.productListContainer}>
                    <ScrollView contentContainerStyle={styles.productScrollContainer}>
                        {products.map(product => (
                            <Product
                                key={product._id}
                                product={product}
                                drawerId={drawer._id}
                                onProductDeleted={fetchProducts}
                                onProductEdited={fetchProducts}
                                onAlarmAdded={fetchProducts}
                                onProductIncrement={fetchProducts}
                                onProductDecrement={fetchProducts}
                            />
                        ))}
                    </ScrollView>
                </View>
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
                        <NewProduct
                            drawerId={drawer._id}
                            onAddProduct={fetchProducts}
                            onCancelProduct={() => setShowAddProduct(false)}
                        />
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

    productIconsContainer: {
        flexDirection: 'row',   
        justifyContent: 'flex-start', 
        alignItems: 'center',  
        flexWrap: 'nowrap',   
        overflow: 'hidden', 
        marginBottom: 10,
    },
    productIcon: {
        fontSize: 24,
        marginHorizontal: 0,    
    },

    productListContainer: {
        flex: 1,
        width: '100%',
        maxHeight: '60%', // Limita la altura máxima de la lista de productos
        marginBottom: 20, // Añade un margen inferior para la lista
    },
    productScrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default Drawer