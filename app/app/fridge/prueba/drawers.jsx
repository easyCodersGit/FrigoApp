
// import React, { useEffect, useState } from 'react'
// import { View, Text, Button, StyleSheet, FlatList, ActivityIndicator } from 'react-native'
// import { useSearchParams } from 'expo-router'
// import retrieveFridgeDrawers from '../../logic/retrieveFridgeDrawers'

// function FridgeDrawers() {
//     const { id } = useSearchParams()
//     const [drawers, setDrawers] = useState([])
//     const [loading, setLoading] = useState(true)
//     const [error, setError] = useState(null)

//     useEffect(() => {
//         retrieveFridgeDrawers(id)
//             .then(data => {
//                 setDrawers(data)
//                 setLoading(false)
//             })
//             .catch(err => {
//                 setError(err.message)
//                 setLoading(false)
//             })
//     }, [id])

//     if (loading) {
//         return <ActivityIndicator style={styles.loading} />
//     }

//     if (error) {
//         return <Text style={styles.errorText}>Error: {error}</Text>
//     }

//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Drawers</Text>
//             <FlatList
//                 data={drawers}
//                 keyExtractor={(item) => item.id}
//                 renderItem={({ item }) => (
//                     <View style={styles.drawer}>
//                         <Text style={styles.drawerText}>{item.name}</Text>
//                         {/* Puedes añadir botones para editar o eliminar cajones */}
//                     </View>
//                 )}
//             />
//             <Button title="Add Drawer" onPress={() => {/* Lógica para añadir un nuevo cajón */ }} />
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
//     drawer: {
//         padding: 15,
//         marginVertical: 5,
//         borderWidth: 1,
//         borderColor: '#ccc',
//         borderRadius: 5,
//         width: '90%',
//     },
//     drawerText: {
//         fontSize: 18,
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

// export default FridgeDrawers
