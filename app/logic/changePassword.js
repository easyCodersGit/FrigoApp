
import { API_URL } from '@env'

import session from './session'

async function changePassword(userId, newPassword, newPasswordConfirm, password) {

    const token = await session.getSessionToken() 

    const req = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ newPassword, newPasswordConfirm, password})
    }

    try {
        const res = await fetch(`${API_URL}/users/${userId}/change-password`, req)
        if (!res.ok) {
            return res.json()

                .catch(error => { throw new Error(error.message) })
                .then(body => { throw new Error(error.message) })
        }
        
    } catch (error) {
        throw new Error(error.message)
    }


    
}

export default changePassword