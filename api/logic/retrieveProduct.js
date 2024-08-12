import { Drawer, Product } from "../data/models.js"
import { validate, errors } from "com"

const { NotFoundError } = errors

async function retrieveProducts(drawerId) {

    validate.id(drawerId, "drawer id")

    try {

        const drawer = await Drawer.findById(drawerId).populate('products')

        if (!drawer) {
            throw new NotFoundError("Drawer not found")

        }

        return drawer.products;


    } catch (error) {

        console.error("Error retrieving drawers:", error)

    }
}

export default retrieveProducts