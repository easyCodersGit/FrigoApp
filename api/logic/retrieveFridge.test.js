import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'

import retrieveFridge from './retrieveFridge.js'

(async () => {
    await mongoose.connect(process.env.MONGODB_URL)

    try {
        const fridge = await retrieveFridge('66b23297350fe3e6045d6161')
        console.log('Esta es la nevera', fridge)
    } catch (error) {

        console.log(error)

    }
})()