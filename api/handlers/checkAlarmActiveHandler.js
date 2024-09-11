// import logic from "../logic/index.js"
// import { errors } from "com"

// const { NotFoundError, SystemError, ContentError } = errors

// export default async (req, res) => {

//     try {
//         const { userId } = req.params

//         if (!userId) {
//             return res.status(400).json({ error: "BadRequest", message: "userId is required" })
//         }

//         const alarmStatusChecked = await logic.checkActiveAlarms(userId)

//         res.status(200).send(alarmStatusChecked)

//     } catch (error) {

//         let status = 400
//         if (error instanceof SystemError) {
//             status = 500
//         } else if (error instanceof NotFoundError) {
//             status = 404
//         } else if (error instanceof ContentError) {
//             status = 406
//         }
//         res.status(status).json({ error: error.constructor.name, message: error.message })
        
        
//     }
// }


//// JSONWEB TOKEN ///

import jwt from 'jsonwebtoken'
const { JsonWebTokenError } = jwt

import logic from "../logic/index.js"
import { errors } from "com"

const { NotFoundError, SystemError, ContentError } = errors

export default async (req, res) => {

    try {
        const { userId } = req.params

        const token = req.headers.authorization.substring(7)

        if (!userId) {
            return res.status(400).json({ error: "BadRequest", message: "userId is required" })
        }

        const alarmStatusChecked = await logic.checkActiveAlarms(userId)

        res.status(200).send(alarmStatusChecked)

    } catch (error) {

        let status = 400
        if (error instanceof SystemError) {
            status = 500
        } else if (error instanceof NotFoundError) {
            status = 404
        } else if (error instanceof ContentError) {
            status = 406
        }
        res.status(status).json({ error: error.constructor.name, message: error.message })
        
        
    }
}