import { API_URL } from '@env'

async function searchProduct(userId, productName) {
    if (!userId || !productName) {
        console.error('User ID and product name are required')
        throw new Error('User ID and product name are required')
    }

    const url = new URL(`${API_URL}/users/${userId}/products`)
    url.searchParams.append('productName', productName)

    const req = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }

    console.log('API_URL:', API_URL)
    console.log('Request URL:', url.toString())

    try {
        const res = await fetch(url.toString(), req)

        if (!res.ok) {
            const errorData = await res.json()
            throw new Error(errorData.message || 'Error al hacer la búsqueda')
        }

        const result = await res.json()

        console.log(result.data)


            return result.data
     
      

    } catch (error) {
        throw new Error(error.message)
    }
}

export default searchProduct

