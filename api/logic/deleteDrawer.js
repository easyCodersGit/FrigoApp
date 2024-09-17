import { Drawer, Fridge, Product, Alarm } from "../data/models.js"

import { errors, validate } from "com"

const { NotFoundError, SystemError } = errors

async function deleteDrawer(fridgeId, drawerId) {

    validate.id(drawerId, 'drawer Id')
    validate.text(fridgeId, 'fridge Id')

    try {
        const drawer = await Drawer.findById(drawerId).lean()
        if (!drawer) {
            throw new NotFoundError('Drawer not found')
        }

        const fridge = await Fridge.findById(fridgeId).lean()
        if (!fridge) {
            throw new NotFoundError('Fridge not found')
        }

        const drawerIndex = fridge.drawers.findIndex(p => p.toString() === drawerId.toString())
        if (drawerIndex === -1) {
            throw new CredentialsError('Drawer not found in the specified fridge')
        }

        if (drawer.products.length > 0) {
            await Alarm.deleteMany({ product: { $in: drawer.products } })
            await Product.deleteMany({ _id: { $in: drawer.products } })
        }

        const drawerName = drawer.name

        fridge.drawers.splice(drawerIndex, 1)

        await Fridge.findByIdAndUpdate(fridgeId, { drawers: fridge.drawers })


        await Drawer.findByIdAndDelete(drawerId)

        return drawerName

    } catch (error) {
        throw new SystemError(error.message)
    }

}

export default deleteDrawer 