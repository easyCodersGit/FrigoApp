import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'

import deleteProduct from './deleteProduct.js'

(async () => {
    await mongoose.connect(process.env.MONGODB_URL)

    try {
        let productName
        productName = await deleteProduct('66b23af1a20302a84806b3b5', '66ba27a8d4cc2a6810cfd6a5')
        console.log(`${productName} eliminado`)
    } catch (error) {
        console.log(error)
    }
})()