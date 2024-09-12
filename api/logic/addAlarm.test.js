import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'

import addAlarm from './addAlarm.js'

(async () => {
    await mongoose.connect(process.env.MONGODB_URL)

    try {
       let newAlarm = await addAlarm('66cb11d2a7f1c48e5602c7a1','66d04f8ffd5577e418672893', 'quantity', 3)
        console.log('Alarma creado', newAlarm)

    } catch (error) {
         console.log(error)
    }
})()