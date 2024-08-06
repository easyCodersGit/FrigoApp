import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'

import addFridge from './addFridge.js'

(async () => {
    await mongoose.connect(process.env.MONGODB_URL)

    try {
        await addFridge('Nevera Cocina', '66a4cbc4fb311e46c4a4ef5d')
        console.log('Nevera creada')
    } catch (error) {

        console.log(error)

    }
})()

