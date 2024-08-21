

import React, { useEffect, useState } from 'react'
import { View, FlatList, Text, StyleSheet, Platform } from 'react-native'
import Drawer from './Drawer'
import retrieveDrawers from '../logic/retrieveDrawers'

function Drawers({ fridgeId, refreshFlag }) {
    const [drawers, setDrawers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

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

    useEffect(() => {
        if (fridgeId) {
            fetchDrawers()
        }
    }, [fridgeId, refreshFlag])

    if (loading) {
        return <Text style={styles.loadingText}>Loading...</Text>
    }

    if (error) {
        return <Text style={styles.errorText}>Error: {error}</Text>
    }

    return (
        <View style={styles.container}>
            <FlatList
                style={styles.FlatList}
                data={drawers}
                renderItem={({ item }) => (
                    <Drawer
                        drawer={item}
                        fridge={fridgeId}
                        onDrawerDeleted={fetchDrawers}
                    />
                )}
                keyExtractor={(item) => item._id.toString()}
                ListEmptyComponent={<Text style={styles.emptyText}>No drawers found.</Text>}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        maxHeight: Platform.OS === 'web' ? 500 : 400,
    },
    flatList: {
        height: 300,
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
