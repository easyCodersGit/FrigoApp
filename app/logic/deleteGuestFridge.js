import { API_URL } from '@env'

import session from './session'

async function deleteGuestFridge(userId) {

    const token = await session.getSessionToken() 

    if (!token) {
        throw new Error('No token found')
    }

    if (!userId ) {
        console.error('user ID is required')
        throw new Error('user ID is required')
    }

    const req = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
        }
    }

    try {

        const res = await fetch(`${API_URL}/users/${userId}/fridges`, req)

        if (!res.ok) {
            const body = await res.json()
            throw new Error(body.message)
        }

        const responseBody = await res.json()

        return responseBody.fridgeName
        
    } catch (error) {

        throw new Error(error.message)
        
    }
    
}

export default deleteGuestFridge