import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const AlarmIconWithBadge = ({ hasActiveAlarms }) => (
    <View style={styles.container}>
        <Ionicons name="alarm-sharp" size={24} color="black" />
        {hasActiveAlarms && <View style={styles.badge} />}
    </View>
);

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        width: 24,
        height: 24,
    },
    badge: {
        position: 'absolute',
        top: -4,
        right: -4,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'red',
    },
});
