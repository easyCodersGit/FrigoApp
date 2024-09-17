

import React, {useState} from 'react'
import { View, Text, ImageBackground, StyleSheet, Dimensions, Platform, Pressable } from 'react-native'
import { useRouter } from 'expo-router'
import CustomAlert from '../library/CustomAlert'
import { ButtonBlue } from './buttons'
import deleteFridge from '../logic/deleteFridge'

const { width } = Dimensions.get('window')

function Fridge(props) {
    const { fridge, onFridgeDeleted, user, hasActiveAlarms, userId } = props
    const [alertVisible, setAlertVisible] = useState(false)

    const router = useRouter()

    const handlePress = () => {
        console.log("Navigating to fridge:", fridge.id, "with alarms:", hasActiveAlarms, "and userId:", userId);
        router.push({
            pathname: `/fridge/${fridge.id}`,
            params: { hasActiveAlarms, userId } 
        })
    }

    const handleDeleteFridge = async () => {
        try {
            const fridgeName = await deleteFridge(fridge.id, user)
            setAlertVisible(false)
            onFridgeDeleted() 
        } catch (error) {
            console.error('Error deleting fridge:', error)
        }
    }

   
    const getImageSource = () => {
        switch (fridge.color) {
            case 'red':
                return require('../img/neveraRoja.png')
            case 'blue':
                return require('../img/neveraAzul.png')
            case 'orange':
            default:
                return require('../img/fridgeOrange.png')
        }
    }

    return (
        <>
            <Pressable onPress={handlePress} style={styles.fridgeContainer}>
                <ImageBackground
                    source={getImageSource()}
                    style={styles.fridgeImage}
                >
                    <View style={styles.nameOverlay}>
                        <Text style={styles.fridgeName}>{fridge.name}</Text>
                    </View>
                    <View style={styles.detailsOverlay}>
              
                    </View>
                    <View style={styles.deleteButtonContainer}>
                        {fridge.id !== "66e5326f68d67ea67715df38" && (
                            <ButtonBlue
                                label="Delete"
                                onPress={() => setAlertVisible(true)}
                            />
                        )}
                    </View>
                </ImageBackground>
            </Pressable>
            
            <CustomAlert
                visible={alertVisible}
                title="Delete Fridge"
                message={`Are you sure you want to delete ${fridge.name}?`}
                onConfirm={handleDeleteFridge}
                onCancel={() => setAlertVisible(false)}
            />
        </>
    )
}

const styles = StyleSheet.create({
    fridgeContainer: {
        flex: 1,
        alignItems: 'flex-end',
        width: Platform.OS === 'web' ? width * 0.2 : width * 0.7,
        margin: 2,
    },
    fridgeImage: {
        width: Platform.OS === 'web' ? 400 : '95%',
        height: Platform.OS === 'web' ? 500 : 450,
        alignItems: 'center',
        justifyContent: 'center'
    },
    nameOverlay: {
        position: 'absolute',
        top: Platform.OS === 'web' ? '35%' : '20%',
        right: 110,
        borderRadius: 5,
        alignItems: 'center', // Alinea horizontalmente
        justifyContent: 'center'
    },
    detailsOverlay: {
        position: 'absolute',
        top: '60%',
        left: 10,
        right: 10,
        padding: 5,
        borderRadius: 5,
    },
    fridgeName: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 5,
        textAlign: 'center',
  
    },
    fridgeOwner: {
        fontSize: 14,
        color: '#fff',
        right: 10,
        textAlign: 'center',
    },
    deleteButtonContainer: {
        position: 'relative',
        bottom: -150,
        right: 10,
    },
})

export default Fridge
