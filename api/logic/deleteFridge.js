import { Fridge, User, Drawer, Product, Alarm } from '../data/models.js'

import { errors, validate } from "com"
import deleteDrawer from './deleteDrawer.js'

const { NotFoundError, SystemError } = errors

async function deleteFridge(fridgeId, userId) {
    validate.text(fridgeId, 'fridge Id')

 try {
    const fridge = await Fridge.findById(fridgeId).lean()
    if (!fridge) {
        throw new NotFoundError('Fridge not found')
    }

    const user = await User.findById(userId).lean()
    if (!user) {
        throw new NotFoundError('User not found')
    }

    const fridgeIndex = user.fridges.findIndex(p => p.toString() === fridgeId.toString())
        if (fridgeIndex === -1) {
            throw new CredentialsError('Fridge not found in user fridges')
        }

        const { drawers } = fridge
        for (const drawerId of drawers) {
           
            
            await deleteDrawer(fridgeId, drawerId.toString())  
        }

        const fridgeName = fridge.name

        await Fridge.findByIdAndDelete(fridgeId)

        user.fridges.splice(fridgeIndex, 1)

        await User.findByIdAndUpdate(userId, {fridges: user.fridges})

        return fridgeName

 } catch (error) {
    throw new SystemError(error.message)
 }

        


}

export default deleteFridge