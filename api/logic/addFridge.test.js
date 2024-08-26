import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'

import addFridge from './addFridge.js'

(async () => {
    await mongoose.connect(process.env.MONGODB_URL)

    try {
        await addFridge('Nevera Roja', '66cb11d2a7f1c48e5602c7a1', 'red')
        console.log('Nevera creada')
    } catch (error) {

        console.log(error)

    }
})()

