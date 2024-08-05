import React from 'react'
import { StyleSheet, View, Pressable, Text } from "react-native"

export function ButtonBlue({ label, onPress }) {



    return (
        <View style={styles.buttonContainer}>
            <Pressable
                style={({ pressed }) => [
                    styles.button,
                    pressed ? styles.buttonPressed : null,
                ]}
                onPress={onPress} // Usa la prop onPress para manejar el evento
            >
                <Text style={styles.buttonLabel}>{label}</Text>
            </Pressable>
        </View>
    );
}

export function ButtonSecondary({ label, onPress }) {
    return (
        <View style={styles.buttonSecondaryContainer}>
            <Pressable
                style={({ pressed }) => [
                    styles.buttonSecondary,
                    pressed ? styles.buttonSecondaryPressed : null,
                ]}
                onPress={onPress}
            >
                <Text style={styles.buttonSecondaryLabel}>{label}</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        width: 130,
        height: 35,
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3,
    },
    button: {
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#9fced2',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',

        cursor: 'pointer', // Esto solo funcionará en React Native Web
    },

    buttonIcon: {
        paddingRight: 8,
    },
    buttonLabel: {
        color: '#9fced2',
        fontSize: 15,
    },
    buttonLabelPressed: {
        color: '#ffffff', // Texto blanco cuando se presiona
    },

    buttonPressed: {
        backgroundColor: '#9fced2',
        // Azul cuando se presiona
    },

    buttonSecondaryContainer: {
        paddingTop: 40,
        width: 130,
        height: 70,
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3,
    },
    buttonSecondary: {

        borderRadius: 10,
        borderWidth: 2,
        backgroundColor: '#ff6347',
        borderColor: '#ff6347', // Un color rojo para el borde
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        cursor: 'pointer',
    },
    buttonSecondaryLabel: {
        color: 'white', // Rojo
        fontSize: 15,
    },
    buttonSecondaryPressed: {
        backgroundColor: '#ff6347', // Un color rojo cuando se presiona
    },
})


