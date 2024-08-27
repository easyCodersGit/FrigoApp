import { Fridge, Drawer, Product, User } from "../data/models.js"
import { errors } from "com"

const { NotFoundError, SystemError } = errors

async function filterProduct(userId, productName) {
    try {
        // Obtener usuario
        const user = await User.findById(userId).lean()

        if (!user) {
            throw new NotFoundError('User not found')
        }

        // Obtener las neveras del usuario
        const userFridges = await Fridge.find({ owner: userId }).lean()

        let userDrawers = []
        let productsFound = []

        // Obtener los cajones de cada nevera
        for (const userFridge of userFridges) {
            const drawers = await Drawer.find({ location: userFridge._id }).lean()
            userDrawers = userDrawers.concat(drawers)
        }

        // Obtener los productos de cada cajón
        for (const drawer of userDrawers) {
            const products = await Product.find({ location: drawer._id, name: productName }).lean()

            if (products.length > 0) {
                products.forEach(product => {
                    productsFound.push({
                        fridge: userFridges.find(f => f._id.equals(drawer.location)).name,
                        drawer: drawer.name,
                        product: product.name,
                        quantity: product.quantity
                    })
                })
            }
        }

        if (productsFound.length === 0) {
            return `El producto ${productName} no se encontró en las neveras del usuario.`
        } else {
            return productsFound
        }
    } catch (error) {
        throw new SystemError(error.message)
    }
}

export default filterProduct
