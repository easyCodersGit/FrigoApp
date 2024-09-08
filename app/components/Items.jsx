// Items.js
import React from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import Item from './Item'

export default function Items({ products }) {
    return (
        <View style={styles.itemsContainer}>
            <FlatList
                data={products}
                renderItem={({ item }) => <Item product={item} />}
                keyExtractor={(item) => item.id.toString()} 
            />
        </View>
    )
}

const styles = StyleSheet.create({
    itemsContainer: {
        flex: 1,
        width: '100%',
    },
})
