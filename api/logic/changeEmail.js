import {User} from '../data/models.js'
import { errors, validate } from "com"
import bcrypt from 'bcryptjs'

const { NotFoundError, SystemError, ContentError, CredentialsError } = errors

async function changeEmail(userId, newEmail, newEmailConfirm, password) {

   

    try {
        const user = await User.findById(userId)

     



        if (!user) {
            throw new NotFoundError('User not found')
        }

        if (newEmail === user.email)
            throw new ContentError('New email can\'t be the same as the current one')

        if (newEmailConfirm !== newEmailConfirm)
            throw new ContentError('new email and its confirmation do not match')

        let match

        try {
            match = await bcrypt.compare(password, user.password)
        } catch (error) {
            throw new SystemError(error.message)
        }

        if (!match)
            throw new CredentialsError('wrong password')

        user.email = newEmail

        
        try {
            await User.findByIdAndUpdate(userId, { email: newEmail })
            
        } catch (error) {
            throw new SystemError('Error updating the email')
            
        }

        return { message: 'Email updated successfully' }




    } catch (error) {
        throw new SystemError(error.message)
    }
}

export default changeEmail