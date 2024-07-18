// import mongoose from 'mongoose';
// import retrieveUser from './retrieveUser.js';
// import dotenv from 'dotenv';

// // Cargar las variables de entorno desde el archivo .env
// dotenv.config();



// (async () => {
//     try {

//         await mongoose.connect(process.env.MONGODB_URL);


//         try {

//             const user = await retrieveUser('669806b8456c2f58be333986');
//             console.log('Usuario recuperado:', user);
//         } catch (error) {
//             console.error('Error al recuperar el usuario:', error);
//         }

//     } catch (error) {
//         console.error('Error al conectar a MongoDB:', error);
//     } finally {
//         console.log('Desconectando de MongoDB...');
//         await mongoose.disconnect();

//     }
// })();


//////////////////// VERSION JEST //////////////////////

// retrieveUser.test.js

import mongoose from 'mongoose';
import retrieveUser from '../logic/retrieveUser.js';
import dotenv from 'dotenv';
import { User } from '../data/models.js';

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

jest.mock('../data/models.js', () => ({
    User: {
        findById: jest.fn()
    }
}));

describe('retrieveUser', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGODB_URL);
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });

    beforeEach(() => {
        User.findById.mockReset();
    });

    test('debe devolver un usuario si se encuentra uno con el ID proporcionado', async () => {
        const mockUserId = '669806b8456c2f58be333986';
        const mockUser = { name: 'John Doe' };

        User.findById.mockReturnValue({
            lean: jest.fn().mockResolvedValue(mockUser)
        });

        const user = await retrieveUser(mockUserId);

        expect(User.findById).toHaveBeenCalledWith(mockUserId, 'name');
        expect(user).toEqual({ name: 'John Doe' });
    });

    test('debe lanzar un error si el usuario no se encuentra', async () => {
        const mockUserId = '669806b8456c2f58be333986';

        User.findById.mockReturnValue({
            lean: jest.fn().mockResolvedValue(null)
        });

        await expect(retrieveUser(mockUserId)).rejects.toThrow('User not found');
    });

    test('debe lanzar un error si ocurre un problema con la búsqueda', async () => {
        const mockUserId = '669806b8456c2f58be333986';
        const mockError = new Error('Database error');

        User.findById.mockReturnValue({
            lean: jest.fn().mockRejectedValue(mockError)
        });

        await expect(retrieveUser(mockUserId)).rejects.toThrow('Database error');
    });
});
