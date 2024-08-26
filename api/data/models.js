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
    fridges: [{
        type: ObjectId,
        ref: 'Fridge'
    }]
})


const fridge = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    owner: {
        type: ObjectId,
        required: true,
        ref: 'User',
    },
    drawers: [{
        type: ObjectId,
        ref: 'Drawer'
    }],

    date: {
        type: Date,
        required: true,
    },
    color: {
        type: String,
         enum: ['orange', 'red', 'blue']
      
    }


})

const drawer = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        type: ObjectId,
        required: true,
        ref: 'Fridge',
    },
    products: [{
        type: ObjectId,
        ref: 'Product'
    }],

    date: {
        type: Date,
        required: true,
    }

})

const product = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: ['vegetables', 'fruits', 'meat', 'fish', 'seafood', 'dairy', 'grains', 'nuts and seeds', 'legumes', 'sweets', 'beverages', 'spices and herbs', 'baked goods', 'condiment and sauces', 'snacks', 'fats and oils', 'frozen foods', 'canned goods'],
    },
    quantity: {
        type: Number,
    },

    expirationDate: {
        type: Date,
        required: true,
    },

    addedDate: {
        type: Date,
        required: true,
    },

    location: {
        type: ObjectId,
        required: true,
        ref: 'Drawer',
    },

    purchased: {
        type: Boolean
    },

    icon: {
        type: String,
        default: '',
    }

})

const shoppingList = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    userId: {
        type: ObjectId,
        ref: 'User'
    },
    items: [{
        type: ObjectId,
        ref: 'Product'
    }],

    createdDate: {
        type: Date,
        required: true,
    }

})

//tenemos que usar una clase para construir usuarios
const User = model('User', user)
const Fridge = model('Fridge', fridge)
const Drawer = model('Drawer', drawer)
const Product = model('Product', product)
const ShoppingList = model('ShoppingList', shoppingList)

export { User, Fridge, Drawer, Product, ShoppingList }