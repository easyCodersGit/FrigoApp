import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'

import deleteAlarm from './deleteAlarm.js'

(async () => {
    await mongoose.connect(process.env.MONGODB_URL)

    try {
        let alarmProduct
        alarmProduct = await deleteAlarm('66cb11d2a7f1c48e5602c7a1', '66cf917f270f4884cb54da27')
        console.log(`${alarmProduct} eliminado`)
    } catch (error) {
        console.log(error)
    }
})()
