
import React from 'react'
import { ImageBackground, StyleSheet, Dimensions } from 'react-native'

export function BackgroundImage({ children }) {
    return (
        <ImageBackground
            source={require('../img/fondo2.webp')}
            style={styles.backgroundImage}
            resizeMode="cover"
        >
            {children}
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        position: 'absolute'
    },
})


