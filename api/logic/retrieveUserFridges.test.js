import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'

import retrieveUserFridges from './retrieveUserFridges.js'

(async () => {
    await mongoose.connect(process.env.MONGODB_URL)

    try {
        const userFridges = await retrieveUserFridges('66a4cbc4fb311e46c4a4ef5d')
        console.log('Las neveras son estas', userFridges)
    } catch (error) {

        console.log(error)

    }
})()

