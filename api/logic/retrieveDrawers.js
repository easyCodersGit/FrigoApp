// Importar las dependencias necesarias
import { Drawer, Fridge } from "../data/models.js"
import { validate, errors } from "com"

const { NotFoundError } = errors


async function retrieveDrawers(fridgeId) {

    validate.id(fridgeId, "fridge id")

    try {

        const fridge = await Fridge.findById(fridgeId).populate({
            path: 'drawers',
            populate: { path: 'products' }
        })


        if (!fridge) {
            throw new NotFoundError("Fridge not found")
        }

        return fridge.drawers;



    } catch (error) {

        console.error("Error retrieving drawers:", error)


        throw error
    }
}


export default retrieveDrawers
