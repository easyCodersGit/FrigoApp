import React from 'react';
import { StyleSheet, View, Pressable, Text } from "react-native";

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

const styles = StyleSheet.create({
    buttonContainer: {
        width: 150,
        height: 48,
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3,
    },
    button: {
        borderRadius: 10,
        borderWidth: 3,
        borderColor: '#58c0de',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        cursor: 'pointer', // Esto solo funcionará en React Native Web
    },

    buttonIcon: {
        paddingRight: 8,
    },
    buttonLabel: {
        color: '#58c0de',
        fontSize: 18,
    },
    buttonLabelPressed: {
        color: '#ffffff', // Texto blanco cuando se presiona
    },

    buttonPressed: {
        backgroundColor: '#58c0de',
        // Azul cuando se presiona
    },
});
