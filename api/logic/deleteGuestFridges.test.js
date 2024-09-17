import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'

import deleteGuestFridge from './deleteGuestFridges.js'

(async () => {
    await mongoose.connect(process.env.MONGODB_URL)

    try {
        let fridgeName
        fridgeName = await deleteGuestFridge('66cb11d2a7f1c48e5602c7a1')
        console.log(`${fridgeName} eliminado`)
    } catch (error) {
        console.log(error)
    }
})()