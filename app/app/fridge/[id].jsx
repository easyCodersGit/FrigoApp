import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, Alert, Platform, ImageBackground, Dimensions, Modal } from 'react-native'
import { useRouter, useLocalSearchParams } from 'expo-router'
import retrieveFridge from '../../logic/retrieveFridge'
import { ButtonSecondary, ButtonBlue } from '../../components/buttons'
import { BackgroundImage } from '../../components/background'

import Drawers from '../../components/Drawers'
import NewDrawer from '../../components/NewDrawer'



const { width } = Dimensions.get('window')

function FridgeMain() {
    const { id } = useLocalSearchParams()
    const router = useRouter()

    console.log(id)

    const [fridgeData, setFridgeData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [showAddDrawer, setShowAddDrawer] = useState(false)
    const [drawerRefreshFlag, setDrawerRefreshFlag] = useState(false)

    useEffect(() => {
        const loadFridgeData = async () => {
            try {
                const data = await retrieveFridge(id)
                setFridgeData(data)
            } catch (err) {
                setError(err.message)
                Alert.alert('Error', `No se pudo cargar la nevera: ${err.message}`)
            } finally {
                setLoading(false)
            }
        }

        loadFridgeData()
    }, [id, drawerRefreshFlag])

    const handleViewDetails = () => {
        alert('Botón presionado', 'Has pulsado el botón para ver detalles')
    }

    const handleViewDrawers = () => {
        alert('Botón presionado', 'Has pulsado el botón para gestionar cajones')
    }

    const handleAddDrawerSuccess = () => {
        console.log('handleAddDrawerSuccess called')
        setDrawerRefreshFlag(!drawerRefreshFlag) // Toggle para actualizar el componente Fridges
        setShowAddDrawer(false) // Cierra el modal
    }



    const handlerGoFridges = () => {
        router.push('/Home')
    }

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Error al cargar la nevera</Text>
                <Text>{error}</Text>
            </View>
        )
    }

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <BackgroundImage />
            <Text style={styles.title}>{fridgeData.name}</Text>

            <ImageBackground
                source={require('../../img/bordeNevera2.png')}
                style={styles.fridgeImage}
            >
                <View style={styles.innerContainer}>
                    {/* <ButtonBlue label="View Details" onPress={handleViewDetails} /> */}
                    {/* <ButtonBlue label="Manage Drawers" onPress={handleViewDrawers} /> */}
                    <Drawers fridgeId={id} />

                    <ButtonSecondary
                        label="Add Drawer"
                        onPress={() => setShowAddDrawer(true)} // Muestra el modal para añadir nevera
                    />

                    <Modal
                        visible={showAddDrawer}
                        animationType="slide"
                        onRequestClose={() => setShowAddDrawer(false)}
                    >
                        <NewDrawer fridgeId={id} onAddDrawer={handleAddDrawerSuccess} />
                    </Modal>

                    <ButtonSecondary label="Go to Fridges" onPress={handlerGoFridges} style={styles.fridgeButton} />
                </View>
            </ImageBackground>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',


    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    fridgeInfo: {
        fontSize: 18,

    },
    fridgeImage: {
        width: Platform.OS === 'web' ? '85%' : '95%',
        height: '80%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginLeft: 15,
        paddingTop: 10


    },



    innerContainer: {
        marginTop: 5,
        marginRight: 50,
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
    },

    fridgeButton: {

        // paddingTop: Platform.OS === 'web' ? 10 : 40,
        paddingTop: 5,


    },
})

export default FridgeMain


