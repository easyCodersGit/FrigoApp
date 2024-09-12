import { Fridge, Drawer, Product, User } from "../data/models.js"
import { errors } from "com"

const { NotFoundError, SystemError } = errors

async function filterProduct(userId, productName) {
    try {
        
        const user = await User.findById(userId).lean()

        if (!user) {
            throw new NotFoundError('User not found')
        }

   
        const userFridges = await Fridge.find({ owner: userId }).lean()

        let userDrawers = []
        let productsFound = []

       
        for (const userFridge of userFridges) {
            const drawers = await Drawer.find({ location: userFridge._id }).lean()
            userDrawers = userDrawers.concat(drawers)
        }

     
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
            return { message: `El producto ${productName} no se encontró en las neveras del usuario.`, data: [] }
        } else {
            return { message: 'Product found successfully', data: productsFound }
        }
    } catch (error) {
        throw new SystemError(error.message)
    }
}

export default filterProduct
