import { userModel } from "../../models/user";
import { Types } from "mongoose";
import * as jwt from 'jsonwebtoken'

const mockObjectId = new Types.ObjectId()

const mockUser = new userModel({
    _id: mockObjectId,
    username:'Titotitan',
    email:'tito12345@gmail.com',
    password:'tomenaguapichones',
    tokens:[{
        //@ts-ignore
        token: jwt.sign({_id:mockObjectId}, process.env.SECRET)
    }]
})

const setupDB = async () =>{
    await userModel.deleteMany({})
    await mockUser.save()
}

export {
    setupDB,
    mockUser
}