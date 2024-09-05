import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import retrieveActiveProducts from './retrieveActiveProducts.js'

(async () => {
    await mongoose.connect(process.env.MONGODB_URL)

    try {
        const activeProducts = await retrieveActiveProducts('66cb11d2a7f1c48e5602c7a1')
        console.log('Los productos activos son estos', activeProducts)
    } catch (error) {

        console.log(error)

    }
})()
