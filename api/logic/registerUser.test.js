import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'

import registerUser from './registerUser.js'
import { User } from '../data/models.js'

(async () => {

    try {
        console.log('Intentando conectar a MongoDB...')
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('Conexión a MongoDB Atlas exitosa')

        const userData = {
            name: 'Remy Chef',
            email: 'remy.chef@email.com',
            password: 'password123',
        }

        try {
            console.log('Intentando registrar usuario...')
            const user = await registerUser(userData)
            console.log('Usuario creado:', user)

            // Comprobar que se ha registrado bien y está en la base de datos
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
