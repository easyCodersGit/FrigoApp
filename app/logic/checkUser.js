
import { API_URL } from '@env'

import session from './session'

// async function checkUser(userId) {
//     //validate.id(userId, 'user id')

//     const req = {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//     }

//     try {
//         const url = `${API_URL}/users/${userId}`
//         console.log('API_URL:', url)
//         const response = await fetch(`${API_URL}/users/${userId}`, req)
//         if (!response.ok) {
//             const body = await response.json()
//             throw new errors[body.error](body.message)
//         }
//         const user = await response.json()
//         return user.name
//     } catch (error) {
//         throw new Error(error.message)
//     }
// }

async function checkUser(userId, token) {
    try {
        console.log('checkUser called with userId:', userId)
        const req = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }
        console.log('Sending request to fetch user data')

        const res = await fetch(`${API_URL}/users/${userId}`, req)
        console.log('Response status:', res.status)


        if (!res.ok) {
            const body = await res.json()
            throw new Error(body.message)
        }

        const data = await res.json()
        console.log('User data retrieved:', data)
        return data.name // Ajusta esto según la estructura de la respuesta
    } catch (error) {
        console.error('Error fetching user data:', error)
        throw error
    }
}

export default checkUser