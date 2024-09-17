import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'

import retrieveUserFridges from './retrieveUserFridges.js'

(async () => {
    await mongoose.connect(process.env.MONGODB_URL)

    try {
        const userFridges = await retrieveUserFridges('66cb11d2a7f1c48e5602c7a1')
        console.log('Las neveras son estas', userFridges)
    } catch (error) {

        console.log(error)

    }
})()

