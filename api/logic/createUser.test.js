import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'

import createUser from './createUser.js'
import { User } from '../data/models.js'


if (!process.env.MONGODB_URL) {
    throw new Error('MONGODB_URL no está definida en el archivo .env')
}

(async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('Conexión a MongoDB Atlas exitosa')


        const userData = {
            name: 'Tarzan Jungle',
            email: 'tarzan.doe@example.com',
            password: 'password123',
        }

        try {
            const user = await createUser(userData)
            console.log('Usuario creado:', user)

          
            const savedUser = await User.findOne({ email: userData.email }).lean()
            console.log('Usuario guardado:', savedUser)

            if (savedUser) {
                console.log('Prueba exitosa: El usuario fue creado y recuperado correctamente')
            } else {
                console.error('Prueba fallida: El usuario no fue encontrado en la base de datos')
            }
        } catch (error) {
            console.error('Error al crear el usuario:', error)
        }
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error)
    } finally {
        console.log('Desconectando de MongoDB...')
        await mongoose.disconnect()
    }
})()
