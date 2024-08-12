import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'

import retrieveProducts from './retrieveProduct.js'

(async () => {
    await mongoose.connect(process.env.MONGODB_URL)

    try {
        const products = await retrieveProducts('66b23af1a20302a84806b3b5')
        console.log('Estos son los productos', products)
    } catch (error) {

        console.log(error)

    }
})()