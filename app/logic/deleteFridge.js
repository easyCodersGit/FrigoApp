//import { API_URL } from '@env'

import { API_URL } from '@env'

async function deleteFridge(fridgeId, userId){
    if (!userId || !fridgeId) {
        console.error('user ID and fridgeId are required')
        throw new Error('user ID and fridge ID are required')
    }

    const req = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    }

    console.log('API_URL:', API_URL)
    console.log('Request:', req)

    try {

        const res = await fetch(`${API_URL}/users/${userId}/fridges/${fridgeId}`, req)

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

export default deleteFridge