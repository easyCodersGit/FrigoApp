import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'

import decrementProduct from './decrementProduct.js'

(async () => {
    await mongoose.connect(process.env.MONGODB_URL)

    try {
        let newQuantity
        newQuantity = await decrementProduct('66cf4ce2439e5ec3098993d4', '66d4c4a4afb165a82107e7eb')
        console.log(`${newQuantity}`)
    } catch (error) {
        console.log(error)
    }
})()