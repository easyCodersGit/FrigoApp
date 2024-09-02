
import { validate, errors } from "com"
import { User, Alarm, Product } from "../data/models.js"
import retrieveUserAlarms from "./retrieveUserAlarms.js"

const { NotFoundError, SystemError } = errors

async function checkActiveAlarms(userId) {
    validate.id(userId, 'user id')

    let activeAlarms = []

    try {

        let userAlarms = await retrieveUserAlarms(userId)

        for (const alarm of userAlarms) {

            if(alarm.isActive === true) {

                activeAlarms.push(alarm)

            }
            
        }

        if (activeAlarms.length > 0) {
            return true
        }

        return false
        
    } catch (error) {

        throw new SystemError(error.message)
        
    }
    
}

export default checkActiveAlarms
