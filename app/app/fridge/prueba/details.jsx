// // app/fridge/[id]/details.jsx

// import React, { useEffect, useState } from 'react'
// import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
// import { useSearchParams } from 'expo-router'
// import retrieveFridgeDetails from '../../logic/retrieveFridgeDetails'

// function FridgeDetails() {
//     const { id } = useSearchParams()
//     const [fridge, setFridge] = useState(null)
//     const [loading, setLoading] = useState(true)
//     const [error, setError] = useState(null)

//     useEffect(() => {
//         retrieveFridgeDetails(id)
//             .then(data => {
//                 setFridge(data)
//                 setLoading(false)
//             })
//             .catch(err => {
//                 setError(err.message)
//                 setLoading(false)
//             })
//     }, [id])

//     if (loading) {
//         return <ActivityIndicator style={styles.loading} />;
//     }

//     if (error) {
//         return <Text style={styles.errorText}>Error: {error}</Text>;
//     }

//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Fridge Details</Text>
//             <Text style={styles.text}>Fridge Name: {fridge.name}</Text>
//             <Text style={styles.text}>Owner: {fridge.owner.name}</Text>
//             {/* Agrega más detalles y funcionalidad aquí */}
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
//     text: {
//         fontSize: 18,
//         marginVertical: 5,
//     },
//     errorText: {
//         fontSize: 18,
//         color: 'red',
//         textAlign: 'center',
//     },
//     loading: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
// })

// export default FridgeDetails
