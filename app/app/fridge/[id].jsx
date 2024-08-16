
import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, Alert, Platform, ImageBackground, Dimensions, Modal } from 'react-native'
import { useRouter, useLocalSearchParams } from 'expo-router'
import retrieveFridge from '../../logic/retrieveFridge'
import { ButtonSecondary } from '../../components/buttons'
import { BackgroundImage } from '../../components/background'
import Drawers from '../../components/Drawers'
import NewDrawer from '../../components/NewDrawer'

const { width } = Dimensions.get('window')

function FridgeMain() {
    const { id } = useLocalSearchParams()
    const router = useRouter()

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
        };

        loadFridgeData()
    }, [id, drawerRefreshFlag])

    const handleAddDrawerSuccess = () => {
        setDrawerRefreshFlag(!drawerRefreshFlag)
        setShowAddDrawer(false)
    }

    const handleAddProductSuccess = () => {
        setDrawerRefreshFlag(!drawerRefreshFlag)
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


            <ImageBackground
                source={require('../../img/bordeNevera3.png')}
                style={styles.fridgeImage}
            >
                <View style={styles.innerContainer}>
                    <Text style={styles.title}>{fridgeData.name}</Text>
                    <Drawers fridgeId={id} refreshFlag={drawerRefreshFlag} onProductAdded={handleAddProductSuccess} />

                    <View style={styles.buttonsContainer}>
                        <ButtonSecondary
                            label="Go to Fridges"
                            onPress={handlerGoFridges}
                        />
                        <ButtonSecondary
                            label="Add Drawer"
                            onPress={() => setShowAddDrawer(true)}
                        />
                    </View>

                    <Modal
                        visible={showAddDrawer}
                        animationType="slide"
                        onRequestClose={() => setShowAddDrawer(false)}
                    >
                        <NewDrawer fridgeId={id} onAddDrawer={handleAddDrawerSuccess} />
                    </Modal>
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
    fridgeImage: {
        width: Platform.OS === 'web' ? '100%' : '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,


    },
    innerContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 30

    },
    buttonsContainer: {

        alignItems: 'center',
        justifyContent: 'center',

    },

    imageStyle: {
        resizeMode: 'contain',  // Ajusta la imagen para que esté contenida y centrada
    },

    fridgeButton: {
        marginBottom: 50,
    },
})

export default FridgeMain








