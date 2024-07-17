import mongoose from 'mongoose'
const { Schema, model, ObjectId } = mongoose

const user = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

//tenemos que usar una clase para construir usuarios
const User = model('User', user)

export { User }