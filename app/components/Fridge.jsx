
// import React, {useState} from 'react'
// import { View, Text, ImageBackground, StyleSheet, Dimensions, Platform, Pressable } from 'react-native'
// import { useRouter } from 'expo-router'
// import CustomAlert from '../library/CustomAlert'
// import { ButtonBlue } from './buttons'
// import deleteFridge from '../logic/deleteFridge'


// const { width } = Dimensions.get('window')


// function Fridge(props) {

//     const { fridge, onFridgeDeleted, user } = props
//     const [alertVisible, setAlertVisible] = useState(false)

//     const router = useRouter()


//     const handlePress = () => {

//         router.push(`/fridge/${fridge.id}`)
//     }

//     const handleDeleteFridge = async () => {
//         try {
//             console.log(fridge.id)
//             console.log(user)
//             const fridgeName = await deleteFridge(fridge.id, user)
//             setAlertVisible(false)
//             onFridgeDeleted() // Llamada para actualizar la lista de cajones
//             console.log(`Fridge '${fridgeName}' deleted successfully`)
//         } catch (error) {
//             console.error('Error deleting fridge:', error)
//         }
//     }


//     return (
//         <>
//             <Pressable onPress={handlePress} style={styles.fridgeContainer}>
//                 <ImageBackground
//                     // source={require('../img/neveraRetrieve1.png')}
//                     source={require('../img/fridgeOrange.png')}
//                     style={styles.fridgeImage}
//                 >
//                     <View style={styles.nameOverlay}>
//                         <Text style={styles.fridgeName}>{fridge.name}</Text>
//                     </View>
//                     <View style={styles.detailsOverlay}>
//                         <Text style={styles.fridgeOwner}>Drawers: {fridge.drawers.length}</Text>
//                     </View>
//                     <View style={styles.deleteButtonContainer}>
//                         <ButtonBlue
//                             label="Delete"
//                             onPress={() => setAlertVisible(true)}
//                         />
//                     </View>
//                 </ImageBackground>
//             </Pressable>
            
//             <CustomAlert
//                 visible={alertVisible}
//                 title="Delete Fridge"
//                 message={`Are you sure you want to delete ${fridge.name}?`}
//                 onConfirm={handleDeleteFridge}
//                 onCancel={() => setAlertVisible(false)}
//             />
//         </>
//     );
// }

// const styles = StyleSheet.create({
//     fridgeContainer: {
//         flex: 1,
//         alignItems: 'flex-end',
//         width: Platform.OS === 'web' ? width * 0.2 : width * 0.7,
//         margin: 10,
//     },
//     fridgeImage: {
//         // width: Platform.OS === 'web' ? '100%' : '80%',
//         width: Platform.OS === 'web' ? 400 : '95%',
//         height: Platform.OS === 'web' ? 500 : 450,
  
        
        
//         alignItems: 'center'
//     },
//     nameOverlay: {
//         position: 'absolute',
//         top: Platform.OS === 'web' ? '35%' : '20%',
//         right: 110,
//         borderRadius: 5,
//     },
//     detailsOverlay: {
//         position: 'absolute',
//         top: '60%',
//         left: 10,
//         right: 10,
        

//         padding: 5,
//         borderRadius: 5,
//     },
//     fridgeName: {
       
//         fontSize: 15,
//         fontWeight: 'bold',
//         color: '#fff',
//         marginBottom: 5,
//         textAlign: 'center'
//     },
//     fridgeOwner: {
//         fontSize: 14,
//         color: '#fff',
//         right: 10,
//         textAlign: 'center'
//     },
//     fridgeDate: {
//         fontSize: 14,
//         color: '#fff',
//     },

//     deleteButtonContainer: {
//         position: 'relative',
//         bottom: -350,
//         right: 10,
       
//     },
// })

// export default Fridge


//////


import React, { useState } from 'react'
import { View, StyleSheet, Dimensions, Platform, Pressable, Text } from 'react-native'
import { useRouter } from 'expo-router'

import logic from '../logic'
import addFridge from '../logic/addFridge'

const { width } = Dimensions.get('window')

import { BackgroundImage } from './background'
import { ButtonSecondary } from './buttons'
import { Input } from './input'

export default function NewFridge({ userId, onAddFridge, onCancelAddFridge }) {
    const [nameFridge, setNameFridge] = useState('')
    const [fridgeColor, setFridgeColor] = useState('orange') // Default color
    const router = useRouter()

    const handleAddFridge = async () => {
        try {
            await logic.addFridge(userId, nameFridge, fridgeColor)
            console.log('Fridge added successfully')
            onAddFridge()
            alert('Success', 'Fridge added successfully!')
        } catch (error) {
            console.error('Error adding fridge:', error)
            alert('Error', 'There was an error adding the fridge.')
        }
    }

    return (
        <View style={styles.container}>
            <BackgroundImage />
            <View style={styles.loginContainer}>
                <Input
                    placeholder="Enter Fridge Name"
                    value={nameFridge}
                    onChangeText={setNameFridge}
                    keyboardType="default"
                />

                <View style={styles.colorOptions}>
                    <Pressable 
                        style={[styles.colorOption, fridgeColor === 'red' && styles.selectedColor]}
                        onPress={() => setFridgeColor('red')}
                    >
                        <Text style={styles.colorText}>Red</Text>
                    </Pressable>
                    <Pressable 
                        style={[styles.colorOption, fridgeColor === 'blue' && styles.selectedColor]}
                        onPress={() => setFridgeColor('blue')}
                    >
                        <Text style={styles.colorText}>Blue</Text>
                    </Pressable>
                    <Pressable 
                        style={[styles.colorOption, fridgeColor === 'orange' && styles.selectedColor]}
                        onPress={() => setFridgeColor('orange')}
                    >
                        <Text style={styles.colorText}>Orange</Text>
                    </Pressable>
                </View>

                <ButtonSecondary
                    label="ADD FRIDGE"
                    onPress={handleAddFridge}
                />

                <ButtonSecondary
                    label="CANCEL"
                    onPress={onCancelAddFridge}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginContainer: {
        width: '80%',
        padding: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 10,
    },
    colorOptions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 20,
    },
    colorOption: {
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    selectedColor: {
        borderColor: '#000',
    },
    colorText: {
        fontSize: 16,
    },
})
