import React, { useEffect, useState } from 'react'
import { View, FlatList, Text, StyleSheet } from 'react-native'
import Alarm from './Alarm'
import retrieveUserAlarms from '../logic/retrieveUserAlarms'

function Alarms({ userId, refresh }) {
    const [alarms, setAlarms] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchAlarms = async () => {
        try {
            const fetchedAlarms = await retrieveUserAlarms(userId)
            setAlarms(fetchedAlarms)
            setLoading(false)
        } catch (err) {
            setError(err.message)
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchAlarms()
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
                data={alarms}
                renderItem={({ item }) => <Alarm alarm={item} onAlarmDeleted={fetchAlarms} />}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={<Text style={styles.emptyText}>No alarms found.</Text>}
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
        color: 'black',
    },
})

export default Alarms

