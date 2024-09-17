import { User } from "../data/models.js"
import { errors, validate } from "com"
import bcrypt from 'bcryptjs'

const { NotFoundError, SystemError, ContentError, CredentialsError } = errors

async function changePassword(userId, newPassword, newPasswordConfirm, password) {

    try {

        const user = await User.findById(userId)

        if (!user) {
            throw new NotFoundError('User not found')
        }

        if (newPassword !== newPasswordConfirm)
            throw new CredentialsError('The new email and the confirmation password do not match')

        let match

        try {
            match = await bcrypt.compare(password, user.password)
        } catch (error) {
            throw new SystemError(error.message)
        }

        if (!match)
            throw new CredentialsError('wrong password')

        if (password === newPassword)
            throw new DuplicityError('New password must be different from current one')

        let hashedPassword

        try {
            hashedPassword = await bcrypt.hash(newPassword, 8)
        } catch (error) {
            throw new SystemError(error.message)
        }

        try {
            await User.findByIdAndUpdate(userId, { password: hashedPassword })
            
        } catch (error) {
            throw new SystemError('Error updating the password')
            
        }

        return { message: 'Password changed successfully' }


        
    } catch (error) {
        throw new SystemError(error.message)
    }
    
}

export default changePassword