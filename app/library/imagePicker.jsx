import React, { useState } from 'react'
import { View, Image, Text, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native'

const images = [
    { id: '1', src: require('../img/postreIcon.png'), label: 'Postre' },
    { id: '2', src: require('../img/pizzaIcon.png'), label: 'Pizza' },
    { id: '3', src: require('../img/burgerIcon.png'), label: 'Burger' },
];

export default function ImagePicker({ onSelect }) {
    const [selectedImage, setSelectedImage] = useState(null)
    const [modalVisible, setModalVisible] = useState(false)

    const handleSelectImage = (image) => {
        setSelectedImage(image)
        onSelect(image)
        setModalVisible(false)
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.selectedImageContainer}>
                {selectedImage ? (
                    <Image source={selectedImage.src} style={styles.selectedImage} />
                ) : (
                    <Text>Select an Image</Text>
                )}
            </TouchableOpacity>

            <Modal visible={modalVisible} transparent={true} animationType="slide">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <FlatList
                            data={images}
                            keyExtractor={(item) => item.id}
                            numColumns={3}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => handleSelectImage(item)}>
                                    <Image source={item.src} style={styles.imageOption} />
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    selectedImageContainer: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    selectedImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
    },
    imageOption: {
        width: 80,
        height: 80,
        margin: 5,
        borderRadius: 5,
    },
})
