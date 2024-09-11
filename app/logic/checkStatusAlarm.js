import { API_URL } from '@env'
import session from './session'

// async function checkStatusAlarm(userId){

//     const req = {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
          
//             }

//     try {

//         const res = await fetch(`${API_URL}/users/${userId}/checkActiveAlarm`, req)

//         if (!res.ok) {
//             const body = await res.json()
//             throw new Error(body.message)
//           }

//           const response = await res.json()
//           return response
        
//     } catch (error) {

//         console.error('Fetch error:', error)
//         throw new Error(`Network request failed: ${error.message}`)
        
//     }


// }

async function checkStatusAlarm(userId, token) {
    try {
        console.log('checkStatusAlarm called with userId:', userId)
        const req = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }

        console.log('Sending request to check alarm status')

        const res = await fetch(`${API_URL}/users/${userId}/alarms`, req)
        console.log('Response status for checkStatusAlarm:', res.status)

        if (!res.ok) {
            const body = await res.json()
            throw new Error(body.message)
        }

        const data = await res.json()
        console.log('Alarm status retrieved:', data)
        return data.hasActiveAlarms // Ajusta esto según la estructura de la respuesta
    } catch (error) {
        console.error('Error checking alarms:', error)
        throw error
    }
}


export default checkStatusAlarm