import dotenv from 'dotenv'
dotenv.config()


import mongoose from 'mongoose'
import express from 'express'
import cors from 'cors'

import logic from './logic/index.js'

import {

    retrieveUserHandler,
    authenticateUserHandler,
    addFridgeHandler,
    retrieveUserFridgesHandler,
    retrieveFridgeHandler,
    addDrawerHandler,
    retrieveDrawersHandler,
    retrieveProductsHandler,
    addProductHandler,
    deleteProductHandler,
    deleteDrawerHandler,
    deleteFridgeHandler,
    registerUserHandler,
    editProductHandler,
    filterProductHandler,
    addAlarmHandler,
    checkAlarmHandler

} from './handlers/index.js'

mongoose.connect(process.env.MONGODB_URL)

    .then(() => {
        const server = express()
        server.get('/', (req, res) => res.send('Hello world'))

        const jsonBodyParser = express.json()

        server.use(cors())
        server.use(jsonBodyParser);


        // Register User
        server.post('/users', jsonBodyParser, registerUserHandler)

        // Retrieve User
        server.get('/users/:userId', retrieveUserHandler)

        // Authenticate User
        server.post('/users/auth', jsonBodyParser, authenticateUserHandler)

        // Add Fridge
        server.post('/users/:userId/fridges', jsonBodyParser, addFridgeHandler)

        // Delete Fridge
        server.delete('/users/:userId/fridges/:fridgeId', deleteFridgeHandler)

        // Retrieve User Fridges
        server.get('/users/:userId/fridges', retrieveUserFridgesHandler)

        // Retrieve Fridge
        server.get('/fridges/:fridgeId', retrieveFridgeHandler)

        // Add Drawer
        server.post('/fridges/:fridgeId/drawers', jsonBodyParser, addDrawerHandler)
        

        // Retrieve Drawers
        server.get('/fridges/:fridgeId/drawers', retrieveDrawersHandler)

        // Delete Drawer
        server.delete('/fridges/:fridgeId/drawers/:drawerId', deleteDrawerHandler)

        // Retrieve Products
        server.get('/drawers/:drawerId/products', retrieveProductsHandler)

        // Add Products
        server.post('/drawers/:drawerId/products', addProductHandler)

        // Delete Product
        server.delete('/drawers/:drawerId/products/:productId', deleteProductHandler)

        // Edit Product
        server.patch('/drawers/:drawerId/products/:productId', editProductHandler)

         // Filter Products
         server.get('/users/:userId/products', filterProductHandler)

         // Add Alarm
         server.post('/users/:userId/products/:productId', addAlarmHandler)

          // Check Alarm
          server.post('/users/:userId/products/:productId/checkAlarm', checkAlarmHandler)



        server.listen(process.env.PORT, () => console.log(`server running on port ${process.env.PORT}`))

    })
    .catch(error => console.error(error))


