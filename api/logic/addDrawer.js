import { Drawer, Fridge } from "../data/models.js"

import { errors, validate } from "com"

const { NotFoundError, SystemError } = errors

async function addDrawer(name, fridgeId) {

    validate.id(fridgeId, 'fridge id')
    validate.text(name, 'fridge name')

    try {

        const fridge = await Fridge.findById(fridgeId).lean()

        if (!fridge) {
            throw new NotFoundError('Fridge not found')
        }

        const drawer = await Drawer.create({
            name,
            location: fridgeId,
            products: [],
            date: new Date()

        })

        await Fridge.findByIdAndUpdate(fridgeId, { $push: { drawers: drawer._id } })

        return drawer

    } catch (error) {
        throw new SystemError(error.message)

    }

}

export default addDrawer

