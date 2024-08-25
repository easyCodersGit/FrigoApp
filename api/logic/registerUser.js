import bcrypt from 'bcryptjs'
import { validate, errors } from 'com'
import { User } from '../data/models.js'

const { SystemError, DuplicityError } = errors

async function registerUser({name, email, password}) {
    validate.text(name, 'name')
    validate.email(email, 'email')
    validate.password(password, 'password')

    if (!name || !email || !password) {
        throw new Error('All fields are required')
    }

    let hash
    let user

    try {
        hash = await bcrypt.hash(password, 8)
    } catch (error) {
        throw new SystemError(error.message)
        
    }

    try {
       user =  await User.create({ name, email, password: hash, fridges: []})

       return user

    } catch (error) {
        if (error.code === 11000)
            throw new DuplicityError('user already exists')

        throw new SystemError(error.message)
    }


}

export default registerUser
