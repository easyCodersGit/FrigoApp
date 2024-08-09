import { API_URL } from '@env'

async function addFridge(userId, name) {
    if (!userId || !name) {
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
        const res = await fetch(`${API_URL}/users/${userId}/fridges`, req)

        if (!res.ok) {
            return res.json()

                .catch(error => { throw new Error(error.message) })
                .then(body => { throw new Error(error.message) })
        }

    } catch (error) {
        throw new Error(error.message)
    }
}

export default addFridge
