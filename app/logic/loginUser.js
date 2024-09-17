
import { API_URL } from '@env'
import session from './session'

async function loginUser(email, password) {
    const req = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    }

    try {
        console.log('entrando en loginUser')
        console.log('Connecting to:', `${API_URL}/users/auth`)

        const res = await fetch(`${API_URL}/users/auth`, req)

        if (!res.ok) {
            const body = await res.json()
            throw new Error(body.message)
        }

    
        const responseBody = await res.json()
        console.log('Response JSON:', responseBody)

        
        const { token } = responseBody
        if (!token) {
            throw new Error('Token is undefined or missing from response') 
        }

        console.log('Token received:', token)

        
        const payloadB64 = token.slice(token.indexOf('.') + 1, token.lastIndexOf('.'))
        const payloadJson = atob(payloadB64)
        const payload = JSON.parse(payloadJson)

        const userId = payload.sub 

        await session.setSessionUserId(userId)
        await session.setSessionToken(token)

   
    } catch (error) {
        console.error('Error during login:', error)
        throw new Error(`Login failed: ${error.message}`)
    }
}

export default loginUser
