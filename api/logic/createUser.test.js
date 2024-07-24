import mongoose from 'mongoose';
import dotenv from 'dotenv';
import createUser from './createUser.js';
import { User } from '../data/models.js';

// Cargar las variables de entorno desde el archivo .env
dotenv.config({ path: '../.env' });

// Verificar que la URL de MongoDB esté disponible
if (!process.env.MONGODB_URL) {
    throw new Error('MONGODB_URL no está definida en el archivo .env');
}

(async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('Conexión a MongoDB Atlas exitosa');

        // Datos de prueba
        const userData = {
            name: 'Jane Doe',
            email: 'jane.doe@example.com',
            password: 'password123',
        };

        try {
            const user = await createUser(userData);
            console.log('Usuario creado:', user);

            // Recuperar el usuario para verificar que fue creado correctamente
            const savedUser = await User.findOne({ email: userData.email }).lean();
            console.log('Usuario guardado:', savedUser);

            if (savedUser) {
                console.log('Prueba exitosa: El usuario fue creado y recuperado correctamente');
            } else {
                console.error('Prueba fallida: El usuario no fue encontrado en la base de datos');
            }
        } catch (error) {
            console.error('Error al crear el usuario:', error);
        }
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error);
    } finally {
        console.log('Desconectando de MongoDB...');
        await mongoose.disconnect();
    }
})();
