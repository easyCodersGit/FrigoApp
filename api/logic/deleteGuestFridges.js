import { Fridge, User } from '../data/models.js'
import { errors, validate } from "com"
import retrieveUserFridges from './retrieveUserFridges.js'
import deleteGuestDrawers from './deleteGuestDrawers.js'

const { NotFoundError, SystemError } = errors

async function deleteGuestFridges(userId) {
    const user = await User.findById(userId).lean()
    if (!user) {
        throw new NotFoundError('User not found')
    }

    if (userId !== "66cb11d2a7f1c48e5602c7a1") {
        throw new SystemError('Not Guest User')
    }

    const guestFridges = await retrieveUserFridges(userId)


    const fridgesToDelete = guestFridges.filter(fridge => fridge.id !== "66e5326f68d67ea67715df38")


    await Promise.all(
        fridgesToDelete.map(async (fridge) => {
            try {
      
                await deleteGuestDrawers(fridge.id)
                
                await Fridge.findByIdAndDelete(fridge.id)
                console.log(`Fridge ${fridge.id} eliminada.`)
            } catch (error) {
                console.error(`Error deleting fridge ${fridge.id}:`, error)
            }
        })
    )


    const defaultFridge = guestFridges.find(fridge => fridge.id === "66e5326f68d67ea67715df38")
    if (defaultFridge) {
        try {

            await deleteGuestDrawers(defaultFridge.id)
            console.log(`Cajones/productos adicionales eliminados en la nevera predeterminada.`)
        } catch (error) {
            console.error(`Error deleting drawers/products in the default fridge:`, error)
        }
    }

    console.log('Todas las neveras eliminadas, excepto la nevera predeterminada.')
}

export default deleteGuestFridges



