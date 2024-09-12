import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'

import checkActiveAlarms from './checkActiveAlarm.js'

(async () => {
    await mongoose.connect(process.env.MONGODB_URL)

    try {
        const userAlarms = await checkActiveAlarms('66cb11d2a7f1c48e5602c7a1')
        console.log('Tienes alarmas activas?', userAlarms)
    } catch (error) {

        console.log(error)

    }
})()