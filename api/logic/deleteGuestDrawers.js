import { Fridge, Drawer } from '../data/models.js'
import { errors, validate } from "com"
import retrieveDrawers from './retrieveDrawers.js'
import deleteGuestProducts from './deleteGuestProducts.js'

const { NotFoundError, SystemError } = errors

async function deleteGuestDrawers(fridgeId) {
    const fridge = await Fridge.findById(fridgeId)
    if (!fridge) {
        throw new NotFoundError('Fridge not found')
    }


    const guestDrawers = await retrieveDrawers(fridgeId)

    await Promise.all(
        guestDrawers.map(async (drawer) => {
            try {
            
                await deleteGuestProducts(drawer.id)
                console.log(`Productos eliminados del cajón ${drawer.id}`)
            } catch (error) {
                console.error(`Error deleting products in drawer ${drawer.id}:`, error)
            }
        })
    )

    const drawersToDelete = guestDrawers.filter(drawer => 
        drawer.id !== "66e8737d62c67143ccfd4013" &&
        drawer.id !== "66e873a262c67143ccfd403b"
    )

    await Promise.all(
        drawersToDelete.map(async (drawer) => {
            try {
                await Drawer.findByIdAndDelete(drawer.id)
                console.log(`Cajón ${drawer.id} eliminado.`)
            } catch (error) {
                console.error(`Error deleting drawer ${drawer.id}:`, error)
            }
        })
    )

    console.log('Todos los cajones adicionales y productos fueron eliminados, excepto los excluidos.')


}

export default deleteGuestDrawers
