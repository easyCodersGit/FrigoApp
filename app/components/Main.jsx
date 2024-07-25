import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export function Main() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Esto es Main</Text>
            <Image
                source={require('../img/frigoAppCartoon.webp')}
                style={styles.image}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 24,
        color: '#000',
        marginBottom: 20,
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },
});
