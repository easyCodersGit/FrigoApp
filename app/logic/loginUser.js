
// Importar la variable de entorno
import { API_URL } from '@env'
import session from "./session"

function loginUser(email, password) {
    // Validar el email y la contraseña
    //validate.email(email);
    //validate.password(password);

    const req = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    }


    return fetch(`${API_URL}/users/auth`, req)
        .catch(error => { throw new Error(error.message) })
        .then(res => {
            if (!res.ok) {
                return res.json()
                    .catch(error => { throw new Error(error.message) })
                    .then(body => { throw new errors[body.error](body.message) })
            }

            return res.json()
                .catch(error => { throw new Error(error.message) })
                .then(userId => {
                    session.sessionUserId = userId;
                })
        })
}

export default loginUser
