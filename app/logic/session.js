const session = {

    set sessionUserId(userId) {
        if (userId)
            sessionStorage.userId = userId
        else
            delete sessionStorage.userId
    },

    get sessionUserId() {
        return sessionStorage.userId ? sessionStorage.userId : null
        // si hay algo devuelvo sessionStorage.userId, sino un null 
    }

}

export default session