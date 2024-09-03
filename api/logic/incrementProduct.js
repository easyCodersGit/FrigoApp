import {Drawer, Product} from "../data/models.js"
import { errors, validate } from "com"

const { SystemError, NotFoundError } = errors

async function incrementProduct(drawerId, productId){
    validate.id(drawerId, 'drawer Id')
    validate.text(productId, 'product Id')

    try {

        const drawer = await Drawer.findById(drawerId).lean()
        if (!drawer) {
            throw new NotFoundError('Drawer not found')
        }

        const product = await Product.findById(productId).lean()
        if (!product) {
            throw new NotFoundError('Product not found')
        }

        const productIndex = drawer.products.findIndex(p => p.toString() === productId.toString())
        if (productIndex === -1) {
            throw new CredentialsError('Product not found in the specified drawer')
        }

        product.quantity = product.quantity + 1

        await Product.findByIdAndUpdate(productId, { quantity: product.quantity })

        return product.quantity


        
    } catch (error) {
        throw new SystemError(error.message)
    }
}

export default incrementProduct