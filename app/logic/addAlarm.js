import { API_URL } from '@env'
import session from './session'

async function addAlarm(userId, productId, type, number) {

    const token = await session.getSessionToken() 

    if (!userId || !productId) {
        console.error('User ID and product ID are required')
        throw new Error('User ID and product ID are required')
    }

    const req = {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({type, number }),

    }

    console.log('API_URL:', API_URL)
    console.log('Request:', req)

    try {
        const res = await fetch(`${API_URL}/users/${userId}/products/${productId}`, req)

        if (!res.ok) {

            const errorData = await res.json()
            throw new Error(errorData.message || 'Error al añadir la alarma')
        }
    } catch (error) {
        throw new Error(error.message)
    }



}

export default addAlarm