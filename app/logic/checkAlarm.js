// import { API_URL } from '@env'

// async function checkAlarm( userId, productId, alarmId){

//     const req = {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ alarmId}),
//     }

//     console.log('API_URL:', API_URL)
//     console.log('Request:', req)

//     try {
//         const res = await fetch(`${API_URL}/users/${userId}/alarms`, req)

//         if (!res.ok) {
//             const body = await res.json()
//             throw new Error(body.message)
//         }

//         const response = await res.json()
//         return response


//     } catch (error) {

//         console.error('Fetch error:', error)
//         throw new Error(`Network request failed: ${error.message}`)
        
//     }

// }

// export default checkAlarm