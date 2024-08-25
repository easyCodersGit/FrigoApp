import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import authenticateUser from './authenticateUser.js'

(async () => {
    await mongoose.connect(process.env.MONGODB_URL)

    try {
        const userId = await authenticateUser('remy.chef@email.com', 'password123')
        console.log('user authenticated', userId)
    } catch (error) {

        console.log(error)

    }
})()