import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'

import deleteDrawer from './deleteDrawer.js'

(async () => {
    await mongoose.connect(process.env.MONGODB_URL)

    try {
        let drawerName
        drawerName = await deleteDrawer('66b23297350fe3e6045d6161', '66b237ac248aeee709ef7de8')
        console.log(`${drawerName} eliminado`)
    } catch (error) {
        console.log(error)
    }
})()