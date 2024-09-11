

// import { API_URL } from '@env'

// import session from './session'

// async function retrieveUserFridges(userId) {
//     const req = {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         //body: JSON.stringify({ userId })
//     };

//     console.log('API_URL:', API_URL)
//     console.log('Request:', req)

//     try {
//         const res = await fetch(`${API_URL}/users/${userId}/fridges`, req)

//         if (!res.ok) {
//             const body = await res.json()
//             throw new Error(body.message)
//         }

//         return res.json()

//     } catch (error) {
//         console.error('Fetch error:', error)
//         throw new Error(`Network request failed: ${error.message}`)
//     }
// }

// export default retrieveUserFridges

/// con jsonwebtoken 

import { API_URL } from '@env'

import session from './session'

async function retrieveUserFridges(userId) {
    const token = await session.getSessionToken() // Obtenemos el token almacenado

    if (!token) {
        throw new Error('No token found')
    }

    const req = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
        },
        //body: JSON.stringify({ userId })
    }

    console.log('API_URL:', API_URL)
    console.log('Request:', req)

    try {
        const res = await fetch(`${API_URL}/users/${userId}/fridges`, req)

        if (!res.ok) {
            const body = await res.json()
            throw new Error(body.message)
        }

        return res.json()

    } catch (error) {
        console.error('Fetch error:', error)
        throw new Error(`Network request failed: ${error.message}`)
    }
}

export default retrieveUserFridges