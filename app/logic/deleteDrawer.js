import { API_URL } from '@env'

async function deleteDrawer(fridgeId, drawerId) {

    if (!drawerId || !fridgeId) {
        console.error('drawer ID and fridgeId are required')
        throw new Error('drawer ID and fridge ID are required')
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

        const res = await fetch(`${API_URL}/fridges/${fridgeId}/drawers/${drawerId}`, req)

        if (!res.ok) {
            const body = await res.json()
            throw new Error(body.message)
        }

        const responseBody = await res.json()

        return responseBody.drawerName

    } catch (error) {

    }
}

export default deleteDrawer