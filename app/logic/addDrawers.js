import { API_URL } from '@env'

async function addDrawer(fridgeId, name) {
    if (!fridgeId || !name) {
        console.error('User ID and fridge name are required')
        throw new Error('User ID and fridge name are required')
    }

    const req = {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),

    }

    console.log('API_URL:', API_URL)
    console.log('Request:', req)

    try {
        const res = await fetch(`${API_URL}/fridges/${fridgeId}/drawers`, req)

        if (!res.ok) {

            const errorData = await res.json()
            throw new Error(errorData.message || 'Error al añadir el cajón');
        }
    } catch (error) {
        throw new Error(error.message)
    }
}

export default addDrawer