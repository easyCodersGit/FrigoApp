// app/components/CustomInput.jsx
import React from 'react'
import { TextInput, StyleSheet } from 'react-native'

export function Input({ value, onChangeText, placeholder, secureTextEntry = false, keyboardType = 'default', style }) {
    return (
        <TextInput
            style={[styles.input, style]} // Permite la sobrescritura de estilos
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor="#9fced2"
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            autoCapitalize="none"
        />
    )
}

const styles = StyleSheet.create({
    input: {
        color: '#ff6347',
        fontSize: 18,
        height: 40,
        borderBottomColor: '#9fced2',
        borderBottomWidth: 2,
        marginBottom: 1,
        paddingHorizontal: 10,
        paddingVertical: 10,
        width: 150,



    },
})
