import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'

import addAlarm from './addAlarm.js'

(async () => {
    await mongoose.connect(process.env.MONGODB_URL)

    try {
        await addAlarm('66cb11d2a7f1c48e5602c7a1','66cf4bc0439e5ec3098993a5', 'quantity', 2)
        console.log('Alarma creado')

    } catch (error) {
         console.log(error)
    }
})()