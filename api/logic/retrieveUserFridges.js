import { validate, errors } from "com"
import { User, Fridge } from "../data/models.js"
const { NotFoundError, SystemError } = errors

async function retrieveUserFridges(userId) {
    validate.id(userId, 'user id')

    let userFridges

    try {
        const user = await User.findById(userId).lean()

        if (!user) {
            throw new NotFoundError('User not found')
        }


        userFridges = await Fridge.find({ owner: userId }).populate('owner', 'name').lean()

    } catch (error) {
        throw new SystemError(error.message)
    }


    userFridges.forEach(userFridge => {
        userFridge.id = userFridge._id.toString()
        delete userFridge._id

        if (userFridge.owner && userFridge.owner._id) {
            userFridge.owner.id = userFridge.owner._id.toString()
            delete userFridge.owner._id
        }

        delete userFridge.__v
    })

    return userFridges
}

export default retrieveUserFridges
