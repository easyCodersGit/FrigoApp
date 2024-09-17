
import { API_URL } from '@env'

import session from './session'

async function changeEmail(userId, newEmail, newEmailConfirm, password) {

    const token = await session.getSessionToken() 

    const req = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ newEmail, newEmailConfirm, password})
    }

    try {
        const res = await fetch(`${API_URL}/users/${userId}/change-email`, req)
        if (!res.ok) {
            return res.json()

                .catch(error => { throw new Error(error.message) })
                .then(body => { throw new Error(error.message) })
        }
        
    } catch (error) {
        throw new Error(error.message)
    }


    
}

export default changeEmail
