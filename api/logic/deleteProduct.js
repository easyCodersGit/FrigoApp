import { Product, Drawer } from "../data/models.js"
import { errors, validate } from "com"

const { NotFoundError, SystemError } = errors

async function deleteProduct(drawerId, productId) {

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

        const productName = product.name

        drawer.products.splice(productIndex, 1)

        await Drawer.findByIdAndUpdate(drawerId, { products: drawer.products })


        await Product.findByIdAndDelete(productId)

        return productName

    } catch (error) {
        throw new SystemError(error.message)
    }

}

export default deleteProduct