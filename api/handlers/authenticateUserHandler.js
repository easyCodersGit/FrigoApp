
import logic from "../logic/index.js"
import { errors } from "com"

const { NotFoundError, CredentialsError, ContentError } = errors

export default async (req, res) => {
    try {
        const { email, password } = req.body

        // Llamar a la lógica de autenticación
        logic.authenticateUser(email, password)
            .then(userId => {
                // Asegúrate de devolver un objeto JSON con userId como propiedad
                res.json({ userId })
            })
            .catch(error => {
                let status = 500

                if (error instanceof NotFoundError)
                    status = 404
                else if (error instanceof CredentialsError)
                    status = 401

                res.status(status).json({ error: error.constructor.name, message: error.message })
            })
    } catch (error) {
        let status = 500

        if (error instanceof ContentError || error instanceof TypeError)
            status = 406

        res.status(status).json({ error: error.constructor.name, message: error.message })
    }
}
