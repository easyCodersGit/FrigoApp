
//import { API_URL } from '@env'
import { API_URL } from '@env'

import session from './session'

async function retrieveFridge(fridgeId) {
    const req = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
       
    }

    console.log('API_URL:', API_URL)
    console.log('Request:', req)

    try {
        const res = await fetch(`${API_URL}/fridges/${fridgeId}`, req)

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

export default retrieveFridge