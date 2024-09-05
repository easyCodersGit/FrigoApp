
import { validate, errors } from "com"
import { User, Alarm, Product } from "../data/models.js"
import retrieveUserAlarms from "./retrieveUserAlarms.js"

const { NotFoundError, SystemError } = errors

async function retrieveActiveProducts(userId) {
    validate.id(userId, 'user id')

    let activeProducts = []

    try {

        let userAlarms = await retrieveUserAlarms(userId)

        for (const alarm of userAlarms) {

            if(alarm.isActive === true) {

                activeProducts.push({
                    id: alarm.id,
                    name: alarm.product.name,
                    minimumQuantity: alarm.minimumQuantity
                })
            } 
        }

        return activeProducts
        
    } catch (error) {

        throw new SystemError(error.message)
        
    } 
}

export default retrieveActiveProducts