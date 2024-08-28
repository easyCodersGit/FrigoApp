
import React, { useEffect, useState } from 'react'
import { View, FlatList, Text, StyleSheet } from 'react-native'
import Fridge from './Fridge'
import retrieveUserFridges from '../logic/retrieveUserFridges'

function Fridges({ userId, refresh }) {
    const [fridges, setFridges] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchFridges = async () => {
        try {
            const fetchedFridges = await retrieveUserFridges(userId)
            setFridges(fetchedFridges)
            setLoading(false)
        } catch (err) {
            setError(err.message)
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchFridges()
    }, [userId, refresh])

    if (loading) {
        return <Text style={styles.loadingText}>Loading...</Text>
    }

    if (error) {
        return <Text style={styles.errorText}>Error: {error}</Text>
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={fridges}
                renderItem={({ item }) => <Fridge fridge={item} user={userId} onFridgeDeleted={fetchFridges} />}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={<Text style={styles.emptyText}>No fridges found.</Text>}
              
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
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
        color: 'black',
    },
})

export default Fridges

