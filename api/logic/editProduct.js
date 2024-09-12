import { Product, Drawer } from "../data/models.js"
import { errors, validate } from "com"

const { NotFoundError, SystemError } = errors

async function editProduct(productId, drawerId, updates){

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

        const allowedUpdates = ['name', 'category', 'quantity', 'expirationDate', 'addedDate', 'purchased', 'icon']
        const updatesKeys = Object.keys(updates)

        updatesKeys.forEach(key => {
            if (!allowedUpdates.includes(key)) {
                throw new SystemError(`Invalid field: ${key}`)
            }
        })

        const updatedProduct = await Product.findByIdAndUpdate(productId, { $set: updates }, { new: true }).lean()

        return updatedProduct

        
    } catch (error) {

        throw new SystemError(error.message)
        
    }

}

export default editProduct