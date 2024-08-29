import logic from "../logic/index.js"
import { errors } from "com"

const { NotFoundError, SystemError, ContentError } = errors

export default async (req, res) => {

    try {

        const { userId, productId } = req.params

        const { alarmId } = req.body

        if (!userId || !productId) {
            return res.status(400).json({ error: "BadRequest", message: "productId and userId are required" })
        }


       const alarmChecked = await logic.checkAlarm(userId, productId, alarmId)

        res.status(200).send(alarmChecked)

       
        
    } catch (error) {

        let status = 400
        if (error instanceof SystemError) {
            status = 500
        } else if (error instanceof NotFoundError) {
            status = 404
        } else if (error instanceof ContentError) {
            status = 406
        }
        res.status(status).json({ error: error.constructor.name, message: error.message })
        
    }
}