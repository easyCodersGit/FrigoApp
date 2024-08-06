import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'

import addDrawer from './addDrawer.js'

(async () => {
    await mongoose.connect(process.env.MONGODB_URL)

    try {
        await addDrawer('Segundo Cajon', '66b23297350fe3e6045d6161')
        console.log('Cajon creado')
    } catch (error) {

        console.log(error)

    }
})()

