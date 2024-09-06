
import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Pressable, Modal, Dimensions, Platform } from 'react-native'
import { Input } from './input'
import { ButtonSecondary } from './buttons'
import CustomAlert from '../library/CustomAlert'
import deleteProduct from '../logic/deleteProduct'
import editProduct from '../logic/editProduct'
import { Picker } from '@react-native-picker/picker'
import { BackgroundImage } from './background'
import IconMojis from '../library/IconMojis.jsx'
import DateTimePicker from '@react-native-community/datetimepicker'
import addAlarm from '../logic/addAlarm.js'
import session from '../logic/session'
import { Option2Icon, IncrementIcon, DecrementIcon } from './icons.jsx'
import incrementProduct from '../logic/incrementproduct.js'
import decrementProduct from '../logic/decrementProduct.js'

const { width } = Dimensions.get('window')

function Product({ product, drawerId, onProductDeleted, onProductEdited, onAlarmAdded, onProductIncrement, onProductDecrement, updateAlarmStatus }) {
    const [alertVisible, setAlertVisible] = useState(false)
    const [showEditProduct, setShowEditProduct] = useState(false)
    const [showAddAlarm, setShowAddAlarm] = useState(false)
    const [alarmType, setAlarmType] = useState('expiration') 
    const [alarmNumber, setAlarmNumber] = useState('')
    const [userId, setUserId] = useState(null)
    const [menuVisible, setMenuVisible] = useState(false)

    const [nameProduct, setNameProduct] = useState(product.name)
    const [quantity, setQuantity] = useState(product.quantity.toString())
    const [category, setCategory] = useState(product.category)
    const [expirationDate, setExpirationDate] = useState(new Date(product.expirationDate))
    const [selectedEmoji, setSelectedEmoji] = useState(product.icon || '')
    
    const [showDatePicker, setShowDatePicker] = useState(false)

    useEffect(() => {
        const fetchUserId = async () => {
            const storedUserId = await session.getSessionUserId()
            if (storedUserId) {
                setUserId(storedUserId)
            } else {
                console.error('No userId found in session')
            }
        }

        fetchUserId()
    }, [])

    const handleDeleteProduct = async () => {
        try {
            const productName = await deleteProduct(drawerId, product._id)
            setAlertVisible(false)
            setMenuVisible(false)
            onProductDeleted()
            updateAlarmStatus()
            console.log(`Product '${productName}' deleted successfully`)
        } catch (error) {
            console.error('Error deleting product:', error)
        }
    }

    const handleEditProduct = async () => {
        const updates = {
            name: nameProduct,
            category,
            quantity: parseInt(quantity, 10), 
            expirationDate,
            icon: selectedEmoji 
        }

        try {
            await editProduct(product._id, drawerId, updates)
            setShowEditProduct(false)
            setMenuVisible(false)
            onProductEdited()
            updateAlarmStatus()
            console.log('Product edited successfully')
        } catch (error) {
            console.error('Error editing product:', error)
        }
    }

    const handleDateChange = (event, selectedDate) => {
        setShowDatePicker(false)
        if (selectedDate) {
            setExpirationDate(selectedDate)
        }
    }

    const handleAddAlarm = async () => {
        try {
            await addAlarm(userId, product._id, alarmType, parseInt(alarmNumber, 10))
            setShowAddAlarm(false)
            setMenuVisible(false)
            onAlarmAdded()
           // updateAlarmStatus()
            console.log('Alarm added successfully')
        } catch (error) {
            console.error('Error adding alarm:', error)
        }
    }

    const handleIncrementProduct = async () => {
        try {
            const productQuantity = await incrementProduct(drawerId, product._id)
            onProductIncrement()
            //updateAlarmStatus()
            console.log(`Product new quantity is '${productQuantity}'`)
        } catch (error) {
            console.error('Error deleting product:', error)
        }
    }

    const handleDecrementProduct = async () => {
        try {
            const productQuantity = await decrementProduct(drawerId, product._id)
            onProductDecrement()
            //updateAlarmStatus()
            console.log(`Product new quantity is '${productQuantity}'`)
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

            <View style={styles.buttonContainer}>
                <Pressable style={styles.optionButton} onPress={handleIncrementProduct}>
                    <IncrementIcon />
                </Pressable>

                 <Pressable style={styles.optionButton} onPress={handleDecrementProduct}>
                     <DecrementIcon />
                </Pressable>

                <Pressable onPress={() => setMenuVisible(!menuVisible)} style={styles.optionButton}>
                    <Option2Icon />
                </Pressable>
        </View>

            {menuVisible && (
                <View style={styles.menuContainer}>
                    <Pressable onPress={() => setAlertVisible(true)} style={styles.menuItem}>
                        <Text style={styles.menuText}>Delete</Text>
                    </Pressable>

                    <Pressable onPress={() => setShowEditProduct(true)} style={styles.menuItem}>
                        <Text style={styles.menuText}>Edit</Text>
                    </Pressable>

                    <Pressable onPress={() => setShowAddAlarm(true)} style={styles.menuItem}>
                        <Text style={styles.menuText}>Add Alarm</Text>
                    </Pressable>
                </View>
            )}

            <CustomAlert
                visible={alertVisible}
                title="Delete Product"
                message={`Are you sure you want to delete ${product.name}?`}
                onConfirm={handleDeleteProduct}
                onCancel={() => setAlertVisible(false)}
            />

            <Modal
                visible={showEditProduct}
                animationType="slide"
                onRequestClose={() => setShowEditProduct(false)}
            >
                <View style={styles.container}>
                <BackgroundImage />
                    <View style={styles.productContainerModal}>
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
                            keyboardType="numeric"
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
                            label="SAVE CHANGES"
                            onPress={handleEditProduct}
                        />

                        <ButtonSecondary
                            label="CANCEL"
                            onPress={() => setShowEditProduct(false)}
                        />
                    </View>
                </View>
            </Modal>

            <Modal
                visible={showAddAlarm}
                animationType="slide"
                onRequestClose={() => setShowAddAlarm(false)}
            >
                <View style={styles.modalContainer}>
                <BackgroundImage />
                    <Text style={styles.modalTitle}>Add Alarm</Text>
                    
                    <Picker
                        selectedValue={alarmType}
                        onValueChange={(itemValue) => setAlarmType(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Expiration Alarm" value="expiration" />
                        <Picker.Item label="Quantity Alarm" value="quantity" />
                    </Picker>

                    <Input
                        placeholder={alarmType === 'expiration' ? 'Days before expiration' : 'Minimum quantity'}
                        value={alarmNumber}
                        onChangeText={setAlarmNumber}
                        keyboardType="numeric"
                        placeholderTextColor="black"
                        width={300}
                    />

                    <ButtonSecondary
                        label="Add Alarm"
                        onPress={handleAddAlarm}
                    />

                    <ButtonSecondary
                        label="Cancel"
                        onPress={() => setShowAddAlarm(false)}
                    />
                </View>
            </Modal>
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
    productContainerModal: {
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
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    optionButton: {
        padding: 10,
        alignSelf: 'flex-end',
    },
    menuContainer: {
        position: 'absolute',
        right: 50,
        top: 40,
        backgroundColor: 'white',
        borderRadius: 5,
        elevation: 5,
        zIndex: 1,
    },
    menuItem: {
        padding: 10,
    },
    menuText: {
        fontSize: 16,
        color: 'black',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Puedes cambiar a 'flex-start', 'flex-end', etc., según tus necesidades
        alignItems: 'center',
        marginTop: 5, // Ajusta según sea necesario
    },
})

export default Product

