// import logic from "../logic/index.js"

// import { errors } from "com"

// const { NotFoundError, SystemError } = errors


// export default async (req, res) => {
//     try {
//         const { userId } = req.params

//         logic.retrieveUserFridges(userId)
//             .then(userFridges => res.json(userFridges))
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

/// con jsonwebtoken

import jwt from 'jsonwebtoken'
const { JsonWebTokenError } = jwt

import logic from "../logic/index.js"

import { errors } from "com"

const { NotFoundError, SystemError } = errors


export default async (req, res) => {
    try {
        const { userId } = req.params // se extrae el id de los parámetros de la ruta 
        const token = req.headers.authorization.substring(7) //extraemos el token de la authorización
        jwt.verify(token, process.env.JWT_SECRET) //se valida el token

        logic.retrieveUserFridges(userId)
            .then(userFridges => res.json(userFridges))
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