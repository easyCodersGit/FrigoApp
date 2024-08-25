
//import { API_URL } from '@env'

import { API_URL } from '@env'



import session from './session'

async function loginUser(email, password) {
    const req = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    }

    console.log('API_URL:', API_URL)
    console.log('Request:', req)

    try {
        const res = await fetch(`${API_URL}/users/auth`, req)

        if (!res.ok) {
            const body = await res.json()
            throw new Error(body.message)
        }

        const { userId } = await res.json() // Ahora debe coincidir con la respuesta del servidor
        console.log('User ID received:', userId)

        if (userId) {
            await session.setSessionUserId(userId)
        } else {
            console.error('No userId in response')
        }
        return userId
    } catch (error) {
        console.error('Fetch error:', error)
        throw new Error(`Network request failed: ${error.message}`)
    }
}

export default loginUser



