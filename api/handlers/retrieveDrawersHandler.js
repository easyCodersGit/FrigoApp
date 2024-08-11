import logic from "../logic/index.js"

import { errors } from "com"

const { NotFoundError, SystemError } = errors

export default async (req, res) => {

    try {
        const { fridgeId } = req.params

        logic.retrieveDrawers(fridgeId)
            .then(Drawer => res.json(Drawer))
            .catch(error => {
                let status = 500

                if (error instanceof NotFoundError)
                    status = 404

                res.status(status).json({ error: error.constructor.name, message: error.message })
            })


    } catch (error) {

        res.status(500).json({ error: error.constructor.name, message: error.message })
    }
}