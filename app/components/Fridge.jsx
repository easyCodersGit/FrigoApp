
import React, {useState} from 'react'
import { View, Text, ImageBackground, StyleSheet, Dimensions, Platform, Pressable } from 'react-native'
import { useRouter } from 'expo-router'
import CustomAlert from '../library/CustomAlert'
import { ButtonBlue } from './buttons'
import deleteFridge from '../logic/deleteFridge'


const { width } = Dimensions.get('window')


function Fridge(props) {

    const { fridge, onFridgeDeleted, user } = props
    const [alertVisible, setAlertVisible] = useState(false)

    const router = useRouter()


    const handlePress = () => {

        router.push(`/fridge/${fridge.id}`)
    }

    const handleDeleteFridge = async () => {
        try {
            console.log(fridge.id)
            console.log(user)
            const fridgeName = await deleteFridge(fridge.id, user)
            setAlertVisible(false)
            onFridgeDeleted() // Llamada para actualizar la lista de cajones
            console.log(`Fridge '${fridgeName}' deleted successfully`)
        } catch (error) {
            console.error('Error deleting fridge:', error)
        }
    }


    return (
        <>
            <Pressable onPress={handlePress} style={styles.fridgeContainer}>
                <ImageBackground
                    source={require('../img/neveraRetrieve1.png')}
                    style={styles.fridgeImage}
                >
                    <View style={styles.nameOverlay}>
                        <Text style={styles.fridgeName}>{fridge.name}</Text>
                    </View>
                    <View style={styles.detailsOverlay}>
                        <Text style={styles.fridgeOwner}>Drawers: {fridge.drawers.length}</Text>
                    </View>
                    <View style={styles.deleteButtonContainer}>
                        <ButtonBlue
                            label="Delete"
                            onPress={() => setAlertVisible(true)}
                        />
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
    );
}

const styles = StyleSheet.create({
    fridgeContainer: {
        flex: 1,
        alignItems: 'flex-end',
        width: Platform.OS === 'web' ? width * 0.2 : width * 0.7,
        margin: 10,
    },
    fridgeImage: {
        width: Platform.OS === 'web' ? '100%' : '80%',
        height: 300,
    },
    nameOverlay: {
        position: 'absolute',
        top: Platform.OS === 'web' ? '35%' : '36%',
        left: 10,
        right: 10,

        padding: 5,
        borderRadius: 5,
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
    },
    fridgeOwner: {
        fontSize: 14,
        color: '#fff',
        paddingLeft: 30,
    },
    fridgeDate: {
        fontSize: 14,
        color: '#fff',
    },

    deleteButtonContainer: {
        position: 'relative',
        bottom: -265,
        right: 10,
       
    },
})

export default Fridge
