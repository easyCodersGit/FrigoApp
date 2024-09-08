// Items.js
import React from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import Item from './Item'

export default function Items({ product, onDelete }) {
    return (
        // <View style={styles.itemsContainer}>
        //     <FlatList
        //         data={products}
        //         renderItem={({ item }) => <Item product={item} onDelete={onDelete} />}
        //         keyExtractor={(item) => item.id.toString()} 
        //     />
        // </View>

        <View style={styles.itemsContainer}>
        <Item product={product} onDelete={onDelete} />
    </View>
    )
}

const styles = StyleSheet.create({
    itemsContainer: {
        flex: 1,
        width: '100%',
    },
})
