import React, { useEffect, useState } from 'react'
import { View, FlatList, Text, StyleSheet } from 'react-native'
import Drawer from './Drawer'
import retrieveDrawers from '../logic/retrieveDrawers'

function Drawers({ fridgeId }) {
    const [drawers, setDrawers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchDrawers = async () => {
            console.log('estoy dentro de fetchDrawers')
            try {
                const fetchedDrawers = await retrieveDrawers(fridgeId)
                console.log('Fetched Drawers:', fetchedDrawers)
                setDrawers(fetchedDrawers)
                setLoading(false)
            } catch (err) {
                console.error('Fetch error:', err)
                setError(err.message)
                setLoading(false)
            }
        }

        if (fridgeId) {
            fetchDrawers()
        }
    }, [fridgeId])

    if (loading) {
        return <Text style={styles.loadingText}>Loading...</Text>
    }

    if (error) {
        return <Text style={styles.errorText}>Error: {error}</Text>
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={drawers}
                renderItem={({ item }) => <Drawer drawer={item} />}
                keyExtractor={(item) => item._id.toString()} // se usa _id de Mongoose como key
                ListEmptyComponent={<Text style={styles.emptyText}>No drawers found.</Text>}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    loadingText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 18,
        color: '#666',
    },
    errorText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 18,
        color: 'red',
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#888',
    },
})

export default Drawers

