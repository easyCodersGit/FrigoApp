import logic from "../logic/index.js";
import { errors } from 'com';
const { NotFoundError, ContentError, JsonWebTokenError } = errors;

export default async (req, res) => {
    const { userId } = req.params; // Asegúrate de que userId viene en los parámetros de la solicitud

    try {
        const user = await logic.retrieveUser(userId);
        res.json(user);
    } catch (error) {
        let status = 500;
        if (error.message === 'User not found') {
            status = 404;
        }
        res.status(status).json({ error: error.constructor.name, message: error.message });
    }
};
