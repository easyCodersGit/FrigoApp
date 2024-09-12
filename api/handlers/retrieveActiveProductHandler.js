// import logic from "../logic/index.js"

// import { errors } from "com"

// const { NotFoundError, SystemError } = errors

// export default async (req, res) => {
//     try {
//         const { userId } = req.params

//         logic.retrieveActiveProducts(userId)
//             .then(activeProducts => res.json(activeProducts))
//             .catch(error => {
//                 let status = 500

//                 if (error instanceof NotFoundError)
//                     status = 404

//                 res.status(status).json({ error: error.constructor.name, message: error.message })
//             })
//     } catch (error) {
//         res.status(500).json({ error: error.constructor.name, message: error.message })
//     }
// }

/// JSON WEB TOKEN ///

import jwt from 'jsonwebtoken'
const { JsonWebTokenError } = jwt

import logic from "../logic/index.js"

import { errors } from "com"

const { NotFoundError, SystemError } = errors

export default async (req, res) => {
    try {
        const { userId } = req.params

        const token = req.headers.authorization.substring(7)

        logic.retrieveActiveProducts(userId)
            .then(activeProducts => res.json(activeProducts))
            .catch(error => {
                let status = 500

                if (error instanceof NotFoundError)
                    status = 404

                res.status(status).json({ error: error.constructor.name, message: error.message })
            })
    } catch (error) {
        res.status(500).json({ error: error.constructor.name, message: error.message })
    }
}