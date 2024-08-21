import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'

import deleteFridge from './deleteFridge.js'

(async () => {
    await mongoose.connect(process.env.MONGODB_URL)

    try {
        let fridgeName
        fridgeName = await deleteFridge('66b23297350fe3e6045d6161', '66a4cbc4fb311e46c4a4ef5d')
        console.log(`${fridgeName} eliminado`)
    } catch (error) {
        console.log(error)
    }
})()