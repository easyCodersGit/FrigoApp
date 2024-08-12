import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'

import addProduct from './addProduct.js'

(async () => {
    await mongoose.connect(process.env.MONGODB_URL)

    try {


        const name = 'Manzana'
        const category = 'fruits'
        const quantity = 1
        const expirationDate = '2024-09-01'
        const drawerId = '66b23af1a20302a84806b3b5'
        const icon = '🍊'

        console.log(`Añadiendo producto: ${name}, categoría: ${category}, cantidad: ${quantity}, fecha de expiración: ${expirationDate}, id del cajón: ${drawerId}, icono: ${icon}`)


        await addProduct(name, category, quantity, expirationDate, drawerId, icon)
        console.log('Producto creado exitosamente')
    } catch (error) {

        console.log(error)

    }
})()