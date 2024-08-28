import React from 'react'
import { TextInput, StyleSheet } from 'react-native'

const CustomInput = ({ value, onChangeText, placeholder, style, ...props }) => {
    return (
        <TextInput
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            style={[styles.input, style]}
            {...props}
        />
    )
}

const styles = StyleSheet.create({
    input: {
        height: 30,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        borderColor: 'black'
    },
})

export default CustomInput
