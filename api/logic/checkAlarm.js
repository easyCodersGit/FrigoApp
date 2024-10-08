import { Alarm, User, Product} from "../data/models.js"

import { errors, validate } from "com"

const { SystemError, NotFoundError } = errors

async function checkAlarm( userId, productId, alarmId) {

    try {

        const user = await User.findById(userId).lean()
        if (!user) {
            throw new NotFoundError('User not found')
        }

        const product = await Product.findById(productId).lean()
        if (!product) {
            throw new NotFoundError('Product not found')
        }

        const alarm = await Alarm.findById(alarmId).lean()
        if (!alarm) {
            throw new NotFoundError('Alarm not found')
        }

        if (alarm.owner.toString() !== userId.toString()) {
            throw new CredentialsError('Alarm not found in the specified user alarms')
        }

        console.log(alarm.type)
        console.log(product.minimumQuantity)
        console.log(alarm.minimumQuantity)

        if (alarm.type === 'quantity') {
            if ( product.quantity <= alarm.minimumQuantity){
                alarm.isActive = true
            }
        }

        if (alarm.type === 'expiration') {
            const currentDate = new Date()
            const expirationDate = new Date(product.expirationDate)
            const daysDifference = Math.ceil((expirationDate - currentDate) / (1000 * 60 * 60 * 24))

            if (daysDifference <= alarm.daysBeforeExpiration) {
                alarm.isActive = true
            }
        }

        return alarm.isActive


        
    } catch (error) {
        throw new SystemError(error.message)
    }
    
}

export default checkAlarm

