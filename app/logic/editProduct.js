import { API_URL } from '@env'

async function editProduct(productId, drawerId, updates) {

    if (!productId || !drawerId) {
        console.error('drawer ID and fridge ID are required')
        throw new Error('drawer ID and fridge ID are required')
    }

    const req = {

       method: 'PATCH',
       headers: {
        'Content-Type': 'application/json',

       },
       body: JSON.stringify(updates),
    }

    console.log('API_URL:', API_URL)
    console.log('Request:', req)

    try {
        const res = await fetch(`${API_URL}/drawers/${drawerId}/products/${productId}`, req)

        if (!res.ok) {
            const body = await res.json()
            throw new Error(body.message)
        }

    } catch (error) {
         throw new Error(error.message)
    }

}

export default editProduct