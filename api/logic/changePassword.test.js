import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'

import changePassword from './changePassword.js'

(async () => {
    await mongoose.connect(process.env.MONGODB_URL)

    try {
         await changePassword('66cb11d2a7f1c48e5602c7a1', 'password123', 'password123', 'guestpassword123' )
         console.log('password changed')
       
    } catch (error) {

        console.log(error)

    }
})()