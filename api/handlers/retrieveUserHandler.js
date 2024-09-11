// retrieveUserHandler.js
// import logic from "../logic/index.js"
// import { errors } from "com"

// const { NotFoundError, SystemError } = errors

// export default async (req, res) => {
//     try {
//         const { userId } = req.params

//         logic.retrieveUser(userId)
//             .then(user => {
//                 res.json({ name: user.name })
//             })
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


////// CON JSONWEBTOKEN ////

import jwt from 'jsonwebtoken'
const { JsonWebTokenError } = jwt

import logic from "../logic/index.js"
import { errors } from "com"

const { NotFoundError, SystemError } = errors

export default async (req, res) => {
    try {

        const token = req.headers.authorization.substring(7)
        const { sub: userId } = jwt.verify(token, process.env.JWT_SECRET)

        logic.retrieveUser(userId)
            .then(user => {
                res.json({ name: user.name })
            })
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
