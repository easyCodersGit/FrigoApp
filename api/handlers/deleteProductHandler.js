import logic from "../logic/index.js"
import { errors } from "com"

const { NotFoundError, SystemError, ContentError } = errors

export default async (req, res) => {

    try {

        const { drawerId, productId } = req.params

        if (!productId || !drawerId) {

            return res.status(400).json({ error: "BadRequest", message: "ProductId and userId are required" })
        }

        let productName = await logic.deleteProduct(drawerId, productId)

        res.status(200).json({ message: `Product '${productName}' deleted successfully` })

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