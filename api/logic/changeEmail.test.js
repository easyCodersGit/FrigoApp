import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'

import changeEmail from './changeEmail.js'

(async () => {
    await mongoose.connect(process.env.MONGODB_URL)

    try {
         await changeEmail('66cb11d2a7f1c48e5602c7a1', 'guest@gmail.com', 'guestgmail.com', 'guestpassword123' )
         console.log('email changed')
       
    } catch (error) {

        console.log(error)

    }
})()