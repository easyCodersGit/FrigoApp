//import { API_URL } from '@env'
import { API_URL } from '@env'

async function registerUser(name, email, password){

    if (!email || !name || !password)  {
        console.error('name, email and password are required')
        throw new Error('name, email and password are required')
    }

    const req = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
    }

    try {
        const res = await fetch(`${API_URL}/users`, req)
        if (!res.ok) {
            return res.json()

                .catch(error => { throw new Error(error.message) })
                .then(body => { throw new Error(error.message) })
        }
        
    } catch (error) {
        throw new Error(error.message)
    }


}

export default registerUser