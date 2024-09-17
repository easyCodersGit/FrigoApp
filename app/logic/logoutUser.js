import session from './session'

async function logoutUser() {
    try {
        
        await session.setSessionToken(null)

     
        await session.setSessionUserId(null)


        await session.removeSessionState()

  
        await session.removeSessionStartTime()

        console.log('User logged out successfully')
    } catch (error) {
        console.error('Error during logout:', error)
    }
}

export default logoutUser
