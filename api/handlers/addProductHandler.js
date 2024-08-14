import logic from "../logic/index.js"
import { errors } from "com"

const { NotFoundError, SystemError, ContentError } = errors

export default async (req, res) => {

    try {
        const { drawerId } = req.params

        const { name, category, quantity, expirationDate, icon } = req.body

        if (!name || !drawerId) {

            return res.status(400).json({ error: "BadRequest", message: "Name and userId are required" })
        }

        await logic.addProduct(name, category, quantity, expirationDate, drawerId, icon)

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