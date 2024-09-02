import retrieveUser from "./retrieveUser.js"
import authenticateUser from "./authenticateUser.js"
import addFridge from "./addFridge.js"
import retrieveUserFridges from "./retrieveUserFridges.js"
import retrieveFridge from "./retrieveFridge.js"
import addDrawer from "./addDrawer.js"
import retrieveDrawers from "./retrieveDrawers.js"
import retrieveProducts from "./retrieveProduct.js"
import addProduct from "./addProduct.js"
import deleteProduct from "./deleteProduct.js"
import deleteDrawer from "./deleteDrawer.js"
import deleteFridge from "./deleteFridge.js"
import editProduct from "./editProduct.js"
import registerUser from "./registerUser.js"
import filterProduct from "./filterProduct.js"
import addAlarm from "./addAlarm.js"
import checkAlarm from "./checkAlarm.js"
import retrieveUserAlarms from "./retrieveUserAlarms.js"
import checkActiveAlarms from "./checkActiveAlarm.js"
import deleteAlarm from "./deleteAlarm.js"


const logic = {
    retrieveUser,
    authenticateUser,
    addFridge,
    retrieveUserFridges,
    retrieveFridge,
    addDrawer,
    retrieveDrawers,
    retrieveProducts,
    addProduct,
    deleteProduct,
    deleteDrawer,
    deleteFridge,
    editProduct,
    registerUser,
    filterProduct,
    addAlarm,
    checkAlarm,
    retrieveUserAlarms,
    checkActiveAlarms,
    deleteAlarm
}

export default logic