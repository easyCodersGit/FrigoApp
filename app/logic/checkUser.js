
//import { API_URL } from '@env'

import { API_URL } from '@env'


async function checkUser(userId) {
    //validate.id(userId, 'user id')

    const req = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }

    try {
        const url = `${API_URL}/users/${userId}`
        console.log('API_URL:', url)
        const response = await fetch(`${API_URL}/users/${userId}`, req)
        if (!response.ok) {
            const body = await response.json()
            throw new errors[body.error](body.message)
        }
        const user = await response.json()
        return user.name
    } catch (error) {
        throw new Error(error.message)
    }
}

export default checkUser