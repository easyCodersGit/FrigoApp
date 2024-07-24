function name() {
    return `name-${Math.random()}`
}

function email() {
    return `e-${Math.random()}@mail.com}`
}

function password() {
    return `password-${Math.random()}`
}


const random = {
    name,
    email,
    password
}

export default random





