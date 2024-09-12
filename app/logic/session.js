// // session.js
// import { Platform } from "react-native"
// import AsyncStorage from "@react-native-async-storage/async-storage"

// const isWeb = Platform.OS === 'web'

// const session = {
//     async setSessionUserId(userId) {
//         try {
//             if (isWeb) {
//                 // Uso de sessionStorage para la web
//                 if (userId) {
//                     console.log('Saving userId to sessionStorage:', userId)
//                     sessionStorage.setItem('userId', userId)
//                 } else {
//                     console.log('Removing userId from sessionStorage')
//                     sessionStorage.removeItem('userId')
//                 }
//             } else {
//                 // Uso de AsyncStorage para móvil
//                 if (userId) {
//                     console.log('Saving userId to AsyncStorage:', userId)
//                     await AsyncStorage.setItem('userId', userId)
//                 } else {
//                     console.log('Removing userId from AsyncStorage')
//                     await AsyncStorage.removeItem('userId')
//                 }
//             }
//         } catch (error) {
//             console.error('Error setting user ID:', error)
//         }
//     },

//     async getSessionUserId() {
//         try {
//             if (isWeb) {
//                 // Uso de sessionStorage para la web
//                 const userId = sessionStorage.getItem('userId')
//                 console.log('Retrieved userId from sessionStorage:', userId)
//                 return userId ? userId : null
//             } else {
//                 // Uso de AsyncStorage para móvil
//                 const userId = await AsyncStorage.getItem('userId')
//                 console.log('Retrieved userId from AsyncStorage:', userId)
//                 return userId ? userId : null
//             }
//         } catch (error) {
//             console.error('Error getting user ID:', error)
//             return null
//         }
//     }
// }

// export default session


///// CON JSONWEB TOKEN ///


import { Platform } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"

const isWeb = Platform.OS === 'web'

const session = {
    async setSessionUserId(userId) {
        try {
            if (isWeb) {
                if (userId) {
                    console.log('Saving userId to sessionStorage:', userId)
                    sessionStorage.setItem('userId', userId)
                } else {
                    console.log('Removing userId from sessionStorage')
                    sessionStorage.removeItem('userId')
                }
            } else {
                if (userId) {
                    console.log('Saving userId to AsyncStorage:', userId)
                    await AsyncStorage.setItem('userId', userId)
                } else {
                    console.log('Removing userId from AsyncStorage')
                    await AsyncStorage.removeItem('userId')
                }
            }
        } catch (error) {
            console.error('Error setting user ID:', error)
        }
    },

    async getSessionUserId() {
        try {
            if (isWeb) {
                const userId = sessionStorage.getItem('userId')
                console.log('Retrieved userId from sessionStorage:', userId)
                return userId ? userId : null
            } else {
                const userId = await AsyncStorage.getItem('userId')
                console.log('Retrieved userId from AsyncStorage:', userId)
                return userId ? userId : null
            }
        } catch (error) {
            console.error('Error getting user ID:', error)
            return null
        }
    },

    async setSessionToken(token) {
        try {
            if (isWeb) {
                if (token) {
                    console.log('Saving token to sessionStorage:', token)
                    sessionStorage.setItem('token', token)
                } else {
                    console.log('Removing token from sessionStorage')
                    sessionStorage.removeItem('token')
                }
            } else {
                if (token) {
                    console.log('Saving token to AsyncStorage:', token)
                    await AsyncStorage.setItem('token', token)
                } else {
                    console.log('Removing token from AsyncStorage')
                    await AsyncStorage.removeItem('token')
                }
            }
        } catch (error) {
            console.error('Error setting token:', error)
        }
    },

    async getSessionToken() {
        try {
            if (isWeb) {
                const token = sessionStorage.getItem('token')
                console.log('Retrieved token from sessionStorage:', token)
                return token ? token : null
            } else {
                const token = await AsyncStorage.getItem('token')
                console.log('Retrieved token from AsyncStorage:', token)
                return token ? token : null
            }
        } catch (error) {
            console.error('Error getting token:', error)
            return null
        }
    }
}

export default session
