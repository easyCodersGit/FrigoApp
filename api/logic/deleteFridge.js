import { Fridge, User, Drawer, Product } from '../data/models.js'

import { errors, validate } from "com"

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

        for (const drawerId of fridge.drawers){
            const drawer = await Drawer.findById(drawerId).lean()
            if (drawer && drawer.length > 0){
                await Product.deleteMany({ _id: { $in: drawer.products } })
            }

            await Drawer.findByIdAndDelete(drawerId)
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