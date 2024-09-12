import { User } from '../data/models.js'
import { validate, errors } from 'com'
import mongoose from 'mongoose'

const { NotFoundError } = errors

function retrieveUser(userId) {
    validate.id(userId, 'user id')

    return (async () => {
        let user
        try {
          
            const objectId = new mongoose.Types.ObjectId(userId)
            user = await User.findById(objectId, 'name').lean()
        } catch (error) {
            throw new Error(error.message)
        }

        if (!user) {
            throw new NotFoundError('User not found')
        }

        delete user._id
        return user
    })()
}

export default retrieveUser
