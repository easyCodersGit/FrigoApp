// logic/addProduct.js
import { Product, Drawer } from "../data/models.js"
import { errors, validate } from "com"

const { NotFoundError, SystemError } = errors;

async function addProduct(name, category, quantity, expirationDate, drawerId, icon = '') {
    validate.id(drawerId, 'drawer id')
    validate.text(name, 'product name')
    validate.text(category, 'category')
    validate.number(quantity, 'quantity')

    if (icon) {
        validate.text(icon, 'icon');
    }


    try {

        const drawer = await Drawer.findById(drawerId).lean();
        if (!drawer) {
            throw new NotFoundError('Drawer not found');
        }


        const product = await Product.create({
            name,
            category,
            quantity,
            expirationDate,
            addedDate: new Date(),
            location: drawerId,
            purchased: false,
            icon: icon || ''
        })

        await Drawer.findByIdAndUpdate(drawerId, { $push: { products: product._id } })

        return product
    } catch (error) {
        throw new SystemError(error.message)
    }
}

export default addProduct
