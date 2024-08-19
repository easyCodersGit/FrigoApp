// import { API_URL } from '@env'

import { API_URL } from '@env'

async function addProduct(name, category, quantity, expirationDate, drawerId, icon) {

    if (!drawerId || !name) {
        console.error('drawer ID and product name are required')
        throw new Error('drawer ID and product name are required')
    }

    const req = {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, category, quantity, expirationDate, icon }),

    }

    console.log('API_URL:', API_URL)
    console.log('Request:', req)

    try {
        const res = await fetch(`${API_URL}/drawers/${drawerId}/products`, req)

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

export default addProduct