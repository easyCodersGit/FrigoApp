import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'

import checkAlarm from './checkAlarm.js'

(async () => {
    await mongoose.connect(process.env.MONGODB_URL)

    try {
       let statusAlarm = await checkAlarm('66cb11d2a7f1c48e5602c7a1','66d04f8ffd5577e418672893', '66d0504ae693dfba21088c86')
        console.log('Alarma creado', statusAlarm)

    } catch (error) {
         console.log(error)
    }
})()