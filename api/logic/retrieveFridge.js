import { Fridge } from '../data/models.js'
import { validate, errors } from 'com'


const { NotFoundError } = errors

async function retrieveFridge(fridgeId) {

    validate.id(fridgeId, 'fridge id')

    let fridge

    let drawer

    try {

        fridge = await Fridge.findById(fridgeId).lean()

        if (!fridge) {
            throw new NotFoundError('Fridge not found')
        }

        drawer = await Drawer.find({ _id: { $in: fridge.drawers } }).populate('owner', 'name').lean()

        if (!drawer) {
            throw new NotFoundError('Drawer not found')
        }



    } catch (error) {

        throw new Error(error.message)

    }

    return fridge

}

export default retrieveFridge