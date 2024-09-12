import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'
import retrieveUser from './retrieveUser.js'

(async () => {
    try {
        console.log('Connecting to MongoDB...')
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('Successfully connected to MongoDB Atlas')

        try {
            console.log('Attempting to retrieve user...')
            const user = await retrieveUser('66a4cbc4fb311e46c4a4ef5d')
            console.log('Retrieved user:', user)
        } catch (error) {
            console.error('Error retrieving user:', error.message)
        }
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message)
    } finally {
        console.log('Disconnecting from MongoDB...')
        await mongoose.disconnect()
    }
})()




