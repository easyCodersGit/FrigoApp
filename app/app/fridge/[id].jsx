import React, { useState, useEffect } from 'react'
import { View, Text, Button, StyleSheet, ActivityIndicator, Alert } from 'react-native'
import { useRouter, useSearchParams, useLocalSearchParams } from 'expo-router'
import retrieveFridge from '../../logic/retrieveFridge'
import { ButtonSecondary, ButtonBlue } from '../../components/buttons'
import { BackgroundImage } from '../../components/background'

function FridgeMain() {

    const { id } = useLocalSearchParams()
    const router = useRouter()


    const [fridgeData, setFridgeData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)


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
    }, [id])

    const handleViewDetails = () => {
        // Puedes descomentar la línea de abajo para navegar a la página de detalles
        // router.push(`/fridge/${id}/details`)
        alert('Botón presionado', 'Has pulsado el botón para ver detalles')
    }

    const handleViewDrawers = () => {
        // Puedes descomentar la línea de abajo para navegar a la página de cajones
        // router.push(`/fridge/${id}/drawers`)
        alert('Botón presionado', 'Has pulsado el botón para gestionar cajones')
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
        <View style={styles.container}>
            <BackgroundImage />
            {/* <Text style={styles.title}>Fridge ID: {id}</Text> */}
            <Text style={styles.title}> {fridgeData.name}</Text>
            <Text style={styles.fridgeInfo}>Número de cajones: {fridgeData.drawers.length}</Text>

            <ButtonBlue label="View Details" onPress={handleViewDetails} />
            <ButtonBlue label="Manage Drawers" onPress={handleViewDrawers} />

            <ButtonSecondary label="Go to Fridges" onPress={handlerGoFridges} />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    fridgeInfo: {
        fontSize: 18,
        marginBottom: 10,
    },
})

export default FridgeMain

