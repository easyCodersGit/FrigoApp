import { User } from '../data/models.js'
// const { SystemError, NotFoundError } = errors
function retrieveUser(userId) {
    //validate.id(userId, 'user id')

    return (async () => {

        let user

        try {
            user = await User.findById(userId, 'name').lean()
        } catch (error) {
            throw new Error(error.message)
        }

        if (!user)
            //throw new NotFoundError('User not found')
            throw new Error('User not found')
        delete user._id

        return user

    })()



}

export default retrieveUser