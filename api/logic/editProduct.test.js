import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'

import editProduct from './editProduct.js'

(async () => {
    await mongoose.connect(process.env.MONGODB_URL)

    try {
       let updatedProduct
        const updates = {quantity:14, category: 'meat'}
        updatedProduct = await editProduct('66c8bfd3212348bf6e00c985', '66c8bf96212348bf6e00c97d', updates)
        console.dir(updatedProduct, { depth: null, colors: true })
    } catch (error) {
        console.log(error)
    }
})()