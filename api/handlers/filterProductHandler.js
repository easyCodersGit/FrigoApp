// import logic from "../logic/index.js"
// import { errors } from "com"

// const { NotFoundError, SystemError, ContentError } = errors

// export default async (req, res) => {

//     try {

//         const { userId } = req.params

//         const { productName } = req.query

//         if (!productName || !userId) {

//             return res.status(400).json({ error: "BadRequest", message: "ProductName and userId are required" })
//         }

//         const productsFound = await logic.filterProduct(userId, productName)

//         res.status(200).json({ message: 'Product found successfully', data: productsFound })
        
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


//// JSON WEB TOKEN ///

import jwt from 'jsonwebtoken'
const { JsonWebTokenError } = jwt

import logic from "../logic/index.js"
import { errors } from "com"

const { NotFoundError, SystemError, ContentError } = errors

export default async (req, res) => {

    try {

        const { userId } = req.params

        const token = req.headers.authorization.substring(7)

        const { productName } = req.query

        if (!productName || !userId) {

            return res.status(400).json({ error: "BadRequest", message: "ProductName and userId are required" })
        }

        const productsFound = await logic.filterProduct(userId, productName)

        res.status(200).json({ message: 'Product found successfully', data: productsFound })
        
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