import { API_URL } from '@env'
import session from './session'

async function deleteAlarm(userId, alarmId) {
    const token = await session.getSessionToken() 

    if (!token) {
        throw new Error('No token found')
    }

    if (!userId || !alarmId) {
        console.error('user ID and alarmId are required')
        throw new Error('user ID and alarm ID are required')
    }

    const req = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
        }
    }

    console.log('API_URL:', API_URL)
    console.log('Request:', req)

    try {

        const res = await fetch(`${API_URL}/users/${userId}/alarms/${alarmId}`, req)

        if (!res.ok) {
            const body = await res.json()
            throw new Error(body.message)
        }

        const responseBody = await res.json()

        return responseBody


        
    } catch (error) {
        
        throw new Error(error.message)
    }
    
}

export default deleteAlarm