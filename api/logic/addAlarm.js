 import { Alarm, User, Product} from "../data/models.js"

 import { errors, validate } from "com"

 const { SystemError, NotFoundError } = errors

 async function addAlarm(userId, productId, type, number) {
    validate.id(userId, 'user id')
    validate.id(productId, 'product id')

    try {

        const user = await User.findById(userId).lean()
        if (!user) {
            throw new NotFoundError('User not found')
        }

        const product = await Product.findById(productId).lean()
        if (!product) {
            throw new NotFoundError('Product not found')
        }

      

        const alarmData = {
            owner: userId,
            product: productId,
            type,
            
            createdDate: new Date(),
        }

        if (type === 'expiration') {
            alarmData.daysBeforeExpiration = number
        } else if (type === 'quantity') {
            alarmData.minimumQuantity = number
        } else {
            throw new SystemError('Invalid alarm type')
        }


        const alarm = await Alarm.create(alarmData)

        return alarm


        
    } catch (error) {
        throw new SystemError(error.message)
    }

 }

 export default addAlarm