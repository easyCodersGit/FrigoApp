// session.js
import { Platform } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"

const isWeb = Platform.OS === 'web'

const session = {
    async setSessionUserId(userId) {
        try {
            if (isWeb) {
                // Uso de sessionStorage para la web
                if (userId) {
                    console.log('Saving userId to sessionStorage:', userId)
                    sessionStorage.setItem('userId', userId)
                } else {
                    console.log('Removing userId from sessionStorage')
                    sessionStorage.removeItem('userId')
                }
            } else {
                // Uso de AsyncStorage para móvil
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
                // Uso de sessionStorage para la web
                const userId = sessionStorage.getItem('userId')
                console.log('Retrieved userId from sessionStorage:', userId)
                return userId ? userId : null
            } else {
                // Uso de AsyncStorage para móvil
                const userId = await AsyncStorage.getItem('userId')
                console.log('Retrieved userId from AsyncStorage:', userId)
                return userId ? userId : null
            }
        } catch (error) {
            console.error('Error getting user ID:', error)
            return null
        }
    }
}

export default session
