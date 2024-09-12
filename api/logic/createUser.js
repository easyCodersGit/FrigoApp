import { User, Fridge, Product, Drawer } from '../data/models.js'

async function createUser({ name, email, password }) {
  
    if (!name || !email || !password) {
        throw new Error('All fields are required')
    }

  
    const user = new User({
        name,
        email,
        password,
        fridges: []
    })

    try {
        await user.save()
        return user
    } catch (error) {
        throw new Error('Error creating user: ' + error.message)
    }
}

export default createUser
