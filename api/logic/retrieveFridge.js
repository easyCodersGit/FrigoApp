import { Fridge } from '../data/models.js'
import { validate, errors } from 'com'


const { NotFoundError } = errors

async function retrieveFridge(fridgeId) {

    validate.id(fridgeId, 'fridge id')

    let fridge

    try {

        fridge = await Fridge.findById(fridgeId).lean()

        if (!fridge) {
            throw new NotFoundError('Fridge not found')
        }

    } catch (error) {

        throw new Error(error.message)

    }

    return fridge

}

export default retrieveFridge