
// import React from 'react'
// import { View, Text, Button, StyleSheet } from 'react-native'
// import { useRouter, useSearchParams } from 'expo-router'

// function FridgeMain() {
//     const { id } = useSearchParams()
//     const router = useRouter()

//     const handleViewDetails = () => {
//         router.push(`/fridge/${id}/details`)
//     }

//     const handleViewDrawers = () => {
//         router.push(`/fridge/${id}/drawers`)
//     }

//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Fridge ID: {id}</Text>
//             <Button title="View Details" onPress={handleViewDetails} />
//             <Button title="Manage Drawers" onPress={handleViewDrawers} />
//         </View>
//     )
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         padding: 20,
//     },
//     title: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 20,
//     },
// })

// export default FridgeMain
