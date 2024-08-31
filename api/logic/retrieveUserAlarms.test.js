import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'

import retrieveUserAlarms from './retrieveUserAlarms.js'

(async () => {
    await mongoose.connect(process.env.MONGODB_URL)

    try {
        const userAlarms = await retrieveUserAlarms('66cb11d2a7f1c48e5602c7a1')
        console.log('Las alarmas son estas', userAlarms)
    } catch (error) {

        console.log(error)

    }
})()