import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'

import addProduct from './addProduct.js'

(async () => {
    await mongoose.connect(process.env.MONGODB_URL)

    try {
        await addProduct('Orange', 'fruits', 10, '2024-09-01', '66b23af1a20302a84806b3b5')
        console.log('Producto creado')
    } catch (error) {

        console.log(error)

    }
})()