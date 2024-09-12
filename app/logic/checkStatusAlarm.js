import { API_URL } from '@env'
import session from './session'


async function checkStatusAlarm(userId){

    const token = await session.getSessionToken() 

    const req = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                },
          
            }

    try {

        const res = await fetch(`${API_URL}/users/${userId}/checkActiveAlarm`, req)

        if (!res.ok) {
            const body = await res.json()
            throw new Error(body.message)
          }

          const response = await res.json()
          return response
        
    } catch (error) {

        console.error('Fetch error:', error)
        throw new Error(`Network request failed: ${error.message}`)
        
    }


}


export default checkStatusAlarm