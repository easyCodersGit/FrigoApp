import dotenv from 'dotenv'
dotenv.config()


import mongoose from 'mongoose'
import express from 'express'
import cors from 'cors'

import logic from './logic/index.js'

import {

    retrieveUserHandler,
    authenticateUserHandler

} from './handlers/index.js'

mongoose.connect(process.env.MONGODB_URL)

    .then(() => {
        const server = express()
        server.get('/', (req, res) => res.send('Hello world'))

        const jsonBodyParser = express.json()

        server.use(cors())
        server.use(jsonBodyParser);




        // Retrieve User
        server.get('/users/:userId', retrieveUserHandler)

        // Authenticate User
        server.post('/users/auth', jsonBodyParser, authenticateUserHandler)




        server.listen(process.env.PORT, () => console.log(`server running on port ${process.env.PORT}`))

    })
    .catch(error => console.error(error))