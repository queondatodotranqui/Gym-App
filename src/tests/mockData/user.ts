import { userModel } from "../../models/user";

const setupDB = async () =>{
    await userModel.deleteMany({})
}

export {
    setupDB
}