import logic from "../logic/index.js"
import { errors } from "com"

const { NotFoundError, SystemError, ContentError } = errors

export default async (req, res) => {

    try {

        const { drawerId, productId } = req.params

        const updates = req.body

        console.log('Updates received:', updates)

        if (!productId || !drawerId) {

            return res.status(400).json({ error: "BadRequest", message: "ProductId and userId are required" })
        }

        await logic.editProduct(productId, drawerId, updates)

        res.status(201).json({ message: 'Product edited successfully' })
        
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