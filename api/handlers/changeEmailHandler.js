import jwt from 'jsonwebtoken'
const { JsonWebTokenError } = jwt

import logic from "../logic/index.js"
import { errors } from "com"

const { NotFoundError, SystemError, ContentError } = errors

export default async (req, res) => {

    try {

        const { userId } = req.params

        const token = req.headers.authorization.substring(7)
        jwt.verify(token, process.env.JWT_SECRET)

        const { newEmail, newEmailConfirm, password } = req.body

        if (!newEmail  || !userId || !newEmailConfirm || !password) {
            return res.status(400).json({ error: "BadRequest", message: "Name, color and userId are required" })
        }

        await logic.changeEmail(userId, newEmail, newEmailConfirm, password)

        res.status(201).json({ message: 'Email changed successfully' })

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