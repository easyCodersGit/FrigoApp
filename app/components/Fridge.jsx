
import React from 'react'
import { View, Text, ImageBackground, StyleSheet, Dimensions, Platform, Pressable } from 'react-native'
import { useRouter } from 'expo-router'


const { width } = Dimensions.get('window')


function Fridge(props) {

    const { fridge } = props

    const router = useRouter()


    const handlePress = () => {

        router.push(`/fridge/${fridge.id}`)
    }


    return (
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
            </ImageBackground>
        </Pressable>
    )
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
})

export default Fridge
