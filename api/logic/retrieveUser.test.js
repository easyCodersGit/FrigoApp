import mongoose from 'mongoose';
import retrieveUser from './retrieveUser.js';
import dotenv from 'dotenv';

// Cargar las variables de entorno desde el archivo .env
dotenv.config();



(async () => {
    try {

        await mongoose.connect(process.env.MONGODB_URL);


        try {

            const user = await retrieveUser('669806b8456c2f58be333986');
            console.log('Usuario recuperado:', user);
        } catch (error) {
            console.error('Error al recuperar el usuario:', error);
        }

    } catch (error) {
        console.error('Error al conectar a MongoDB:', error);
    } finally {
        console.log('Desconectando de MongoDB...');
        await mongoose.disconnect();

    }
})();
