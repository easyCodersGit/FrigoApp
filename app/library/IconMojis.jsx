import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'

const IconMojis = ({ onSelect }) => {
    const foodEmojis = ['🍎', '🍌', '🍇', '🍊', '🥑', '🥕', '🍕', '🍔', '🍣', '🍪']

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Choose an Emoji</Text>
            <View style={styles.emojiContainer}>
                {foodEmojis.map((emoji, index) => (
                    <Pressable key={index} onPress={() => onSelect(emoji)} style={styles.emojiButton}>
                        <Text style={styles.emoji}>{emoji}</Text>
                    </Pressable>
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    emojiContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    emojiButton: {
        margin: 10,
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
    },
    emoji: {
        fontSize: 24,
    },
})

export default IconMojis
