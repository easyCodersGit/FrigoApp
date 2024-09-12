

import jwt from 'jsonwebtoken'
const { JsonWebTokenError } = jwt

import logic from "../logic/index.js"
import { errors } from "com"

const { NotFoundError, SystemError, ContentError } = errors

export default async (req, res) => {

    try {

        const token = req.headers.authorization.substring(7)

        const { sub: userId} = jwt.verify(token, process.env.JWT_SECRET)
        jwt.verify(token, process.env.JWT_SECRET)
        

        const { productId } = req.params

        const { type, number } = req.body

        if (!userId || !productId) {
            return res.status(400).json({ error: "BadRequest", message: "productId and userId are required" })
        }


        await logic.addAlarm(userId, productId, type, number)

        res.status(201).send()
        
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