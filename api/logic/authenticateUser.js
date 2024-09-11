import bcrypt from 'bcryptjs'
import { User } from "../data/models.js"
import { validate, errors } from "com"
const { SystemError, NotFoundError, CredentialsError } = errors

function authenticateUser(email, password) {

    validate.email(email, 'email')
    validate.password(password, 'password')

    return (async () => {
        let user

        try {

            user = await User.findOne({ email })

        } catch (error) {

            throw new Error(error.message)

        }

        if (!user)
            throw new Error('User not found')

        let match

        try {
            // match = password === user.password
            match = bcrypt.compare(password, user.password)
            
        } catch (error) {
            throw new Error(error.message)
        }

        if (!match)
            throw new Error('Wrong credentials')

        return user.id
    }

    )()

}

export default authenticateUser