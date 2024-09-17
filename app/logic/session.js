

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
    },

    async setSessionState(state) {
        try {
            if (isWeb) {
                console.log('Saving state to sessionStorage')
                sessionStorage.setItem('initialState', state)
            } else {
                console.log('Saving state to AsyncStorage')
                await AsyncStorage.setItem('initialState', state)
            }
        } catch (error) {
            console.error('Error setting session state:', error)
        }
    },

    async getSessionState() {
        try {
            if (isWeb) {
                const state = sessionStorage.getItem('initialState')
                console.log('Retrieved state from sessionStorage:', state)
                return state ? state : null
            } else {
                const state = await AsyncStorage.getItem('initialState')
                console.log('Retrieved state from AsyncStorage:', state)
                return state ? state : null
            }
        } catch (error) {
            console.error('Error getting session state:', error)
            return null
        }
    },

    async setSessionStartTime(startTime) {
        try {
            if (isWeb) {
                console.log('Saving session start time to sessionStorage')
                sessionStorage.setItem('sessionStartTime', startTime)
            } else {
                console.log('Saving session start time to AsyncStorage')
                await AsyncStorage.setItem('sessionStartTime', startTime)
            }
        } catch (error) {
            console.error('Error setting session start time:', error)
        }
    },

    async getSessionStartTime() {
        try {
            if (isWeb) {
                const startTime = sessionStorage.getItem('sessionStartTime')
                console.log('Retrieved session start time from sessionStorage:', startTime)
                return startTime ? startTime : null
            } else {
                const startTime = await AsyncStorage.getItem('sessionStartTime')
                console.log('Retrieved session start time from AsyncStorage:', startTime)
                return startTime ? startTime : null
            }
        } catch (error) {
            console.error('Error getting session start time:', error)
            return null
        }
    },

    async removeSessionStartTime() {
        try {
            if (isWeb) {
                console.log('Removing session start time from sessionStorage')
                sessionStorage.removeItem('sessionStartTime')
            } else {
                console.log('Removing session start time from AsyncStorage')
                await AsyncStorage.removeItem('sessionStartTime')
            }
        } catch (error) {
            console.error('Error removing session start time:', error)
        }
    },

    async removeSessionState() {
        try {
            if (isWeb) {
                console.log('Removing state from sessionStorage')
                sessionStorage.removeItem('initialState')
            } else {
                console.log('Removing state from AsyncStorage')
                await AsyncStorage.removeItem('initialState')
            }
        } catch (error) {
            console.error('Error removing session state:', error)
        }
    },




}

export default session
