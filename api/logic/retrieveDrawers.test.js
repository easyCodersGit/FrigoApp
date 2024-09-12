import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'

import retrieveDrawers from './retrieveDrawers.js'

(async () => {
    await mongoose.connect(process.env.MONGODB_URL)

    try {
        const drawers = await retrieveDrawers('66b23297350fe3e6045d6161')
        console.log('Estos son los cajones', drawers)
    } catch (error) {

        console.log(error)

    }
})()