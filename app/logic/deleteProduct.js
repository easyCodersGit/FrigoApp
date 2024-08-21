//import { API_URL } from '@env'

import { API_URL } from '@env'

async function deleteProduct(drawerId, productId) {

    if (!drawerId || !productId) {
        console.error('drawer ID and producID are required')
        throw new Error('drawer ID and product ID are required')
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

        const res = await fetch(`${API_URL}/drawers/${drawerId}/products/${productId}`, req)

        if (!res.ok) {
            const body = await res.json()
            throw new Error(body.message)
        }

        const responseBody = await res.json()

        return responseBody.productName

    } catch (error) {

        console.error('Fetch error:', error)
        throw new Error(`Network request failed: ${error.message}`)

    }



}

export default deleteProduct