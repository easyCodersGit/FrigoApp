import { Drawer, Product, Alarm } from '../data/models.js'
import { errors, validate } from "com"
import retrieveProducts from './retrieveProduct.js'

const { NotFoundError, SystemError } = errors

async function deleteGuestProducts(drawerId) {
    validate.id(drawerId, 'drawer Id')

    try {
        const drawer = await Drawer.findById(drawerId).lean()
        if (!drawer) {
            throw new NotFoundError('Drawer not found')
        }

        const guestProducts = await retrieveProducts(drawerId)

        const productsToDelete = guestProducts.filter(product => 
            product.id !== "66e8739162c67143ccfd4033" &&
            product.id !== "66e873d562c67143ccfd4056" &&
            product.id !== "66e873b362c67143ccfd4046" &&
            product.id !== "66e873c562c67143ccfd404c"
        )

        await Promise.all(
            productsToDelete.map(async (product) => {
                try {
                    await Product.findByIdAndDelete(product.id)
                    await Alarm.deleteMany({ product: product.id })
                } catch (error) {
                    console.error(`Error deleting product ${product.id}:`, error)
                }
            })
        )

        console.log('Todos los productos fueron eliminados.')
    } catch (error) {
        throw new SystemError(error.message)
    }
}

export default deleteGuestProducts
