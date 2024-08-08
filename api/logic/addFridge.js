import { Fridge, Drawer, User } from "../data/models.js"
import { errors, validate } from "com"



const { SystemError, NotFoundError } = errors

async function addFridge(name, userId) {
    validate.id(userId, 'user id')
    validate.text(name, 'fridge name')

    try {

        const user = await User.findById(userId).lean()
        if (!user) {
            throw new NotFoundError('User not found')
        }



        const fridge = await Fridge.create({
            name,
            owner: userId,
            date: new Date(),
            drawers: []
        })


        await User.findByIdAndUpdate(userId, { $push: { fridges: fridge._id } })

        return fridge

    } catch (error) {
        throw new SystemError(error.message)
    }
}

export default addFridge

