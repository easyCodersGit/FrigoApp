

import jwt from 'jsonwebtoken'
const { JsonWebTokenError } = jwt

import logic from "../logic/index.js"
import { errors } from "com"

const { NotFoundError, SystemError, ContentError } = errors

export default async (req, res) => {

    try {

        const { fridgeId,  userId } = req.params

        const token = req.headers.authorization.substring(7)
        jwt.verify(token, process.env.JWT_SECRET)

        if (!fridgeId || !userId) {
            return res.status(400).json({ error: "BadRequest", message: "fridgeId and userId are required" })
        }

       let fridgeName =  await logic.deleteFridge(fridgeId, userId)

       res.status(200).json({ message: `Fridge '${fridgeName}' deleted successfully` })

        
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