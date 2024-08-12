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
                onPress={onPress} //la segunda prop que le pasamos, cuando se presione, qué queremos que haga
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
        textAlign: 'center',

        cursor: 'pointer',
    },

    buttonIcon: {
        paddingRight: 8,
    },
    buttonLabel: {
        color: '#9fced2',
        fontSize: 15,
    },
    buttonLabelPressed: {
        color: '#ffffff',
    },

    buttonPressed: {
        backgroundColor: '#9fced2',

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
        borderColor: '#ff6347',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        cursor: 'pointer',
    },
    buttonSecondaryLabel: {
        color: 'white',
        fontSize: 15,
    },
    buttonSecondaryPressed: {
        backgroundColor: '#ff6347',
    },
})


