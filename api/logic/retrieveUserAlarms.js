import { validate, errors } from "com"
import { User, Alarm} from "../data/models.js"
const { NotFoundError, SystemError } = errors

async function retrieveUserAlarms(userId) {
    validate.id(userId, 'user id')

    let userAlarms

    try {
        const user = await User.findById(userId).lean()
        if (!user) {
            throw new NotFoundError('User not found')
        }

     
           userAlarms = await Alarm.find({ owner: userId })
           .populate('owner', 'name')
           .populate('product', 'name') 
           .lean()

       userAlarms.forEach(userAlarm => {
           userAlarm.id = userAlarm._id.toString()
           delete userAlarm._id
   
           if (userAlarm.owner && userAlarm.owner._id) {
               userAlarm.owner.id = userAlarm.owner._id.toString()
               delete userAlarm.owner._id
           }

 
           if (userAlarm.product && userAlarm.product._id) {
               userAlarm.product.id = userAlarm.product._id.toString()
               delete userAlarm.product._id
           }
   
           delete userAlarm.__v
       })

    } catch (error) {
        throw new SystemError(error.message)
    }

    return userAlarms



}

export default retrieveUserAlarms