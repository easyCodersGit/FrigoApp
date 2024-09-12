import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'

import addProduct from './addProduct.js'

(async () => {
    await mongoose.connect(process.env.MONGODB_URL)

    try {


        const name = 'Kiwi'
        const category = 'fruits'
        const quantity = 2
        const expirationDate = '2024-09-01'
        const drawerId = '66cf4ce2439e5ec3098993d4'
        const icon = '🍌'
        const minimumQuantity = 4

        console.log(`Añadiendo producto: ${name}, categoría: ${category}, cantidad: ${quantity}, fecha de expiración: ${expirationDate}, id del cajón: ${drawerId}, icono: ${icon}`)


        await addProduct(name, category, quantity, expirationDate, drawerId, icon, minimumQuantity)
        console.log('Producto creado exitosamente')
    } catch (error) {

        console.log(error)

    }
})()