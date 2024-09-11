
// import { API_URL } from '@env'
// //import { API_URL } from '@env'

// import session from './session'

// async function loginUser(email, password) {
//     const req = {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ email, password })
//     }

//     console.log('API_URL:', API_URL)
//     console.log('Request:', req)

//     try {
//         const res = await fetch(`${API_URL}/users/auth`, req)

//         if (!res.ok) {
//             const body = await res.json()
//             throw new Error(body.message)
//         }

//         const { userId } = await res.json() // Ahora debe coincidir con la respuesta del servidor
//         console.log('User ID received:', userId)

//         if (userId) {
//             await session.setSessionUserId(userId)
//         } else {
//             console.error('No userId in response')
//         }
//         return userId
//     } catch (error) {
//         console.error('Fetch error:', error)
//         throw new Error(`Network request failed: ${error.message}`)
//     }
// }

// export default loginUser



/// CONJSONWEB TOKEN ///
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
        const res = await fetch(`${API_URL}/users/auth`, req)

        if (!res.ok) {
            const body = await res.json()
            throw new Error(body.message)
        }

        // Log para verificar si estamos recibiendo la respuesta JSON correctamente
        const responseBody = await res.json()
        console.log('Response JSON:', responseBody)

        // Verificamos si la propiedad token existe en el JSON recibido
        const { token } = responseBody
        if (!token) {
            throw new Error('Token is undefined or missing from response') // Capturamos el error si el token es undefined
        }

        console.log('Token received:', token)

        // Extraer el payload del token (decodificar base64)
        const payloadB64 = token.slice(token.indexOf('.') + 1, token.lastIndexOf('.'))
        const payloadJson = atob(payloadB64)
        const payload = JSON.parse(payloadJson)

        // Obtener el userId del payload del token
        const { sub: userId } = payload

        // Guardar el userId y el token en la sesión usando los métodos de session.js
        await session.setSessionUserId(userId)
        await session.setSessionToken(token)

        return token
    } catch (error) {
        console.error('Error during login:', error)
        throw new Error(`Login failed: ${error.message}`)
    }
}

export default loginUser
