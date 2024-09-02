import { Alarm, User} from '../data/models.js'

import { errors, validate } from 'com'

import retrieveUserAlarms from './retrieveUserAlarms.js'

const { NotFoundError, SystemError } = errors

async function deleteAlarm(userId, alarmId){
    validate.text(userId, 'user Id')
    validate.text(alarmId, 'alarm Id')

    try {

        const user = await User.findById(userId).lean()
        if (!user) {
            throw new NotFoundError('User not found')
        }

        const alarm = await Alarm.findById(alarmId).lean()
        if (!alarm) {
            throw new NotFoundError('Alarm not found')
        }


        const userAlarms = await retrieveUserAlarms(userId)

        const alarmIndex = userAlarms.findIndex(a => a.id.toString() === alarmId.toString())
        if (alarmIndex === -1) {
            throw new CredentialsError('Alarm not found in user alarms')
        }

        const alarmProductDeleted = alarm.product

        await Alarm.findByIdAndDelete(alarmId)

        return alarmProductDeleted

            
        
    } catch (error) {
          throw new SystemError(error.message)
    }
}

export default deleteAlarm