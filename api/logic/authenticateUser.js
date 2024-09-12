

import bcrypt from 'bcryptjs'
import { User } from "../data/models.js"
import { validate, errors } from "com"
const { SystemError, NotFoundError, CredentialsError } = errors

async function authenticateUser(email, password) {

    validate.email(email, 'email')
    validate.password(password, 'password')

    try {
        const user = await User.findOne({ email })
        
        if (!user)
            throw new NotFoundError('User not found')

        const match = await bcrypt.compare(password, user.password) 

        if (!match)
            throw new CredentialsError('Wrong credentials')

        return user.id
    } catch (error) {
        if (error instanceof NotFoundError || error instanceof CredentialsError) {
            throw error
        } else {
            throw new SystemError(error.message)
        }
    }
}

export default authenticateUser
