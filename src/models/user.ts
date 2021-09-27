import { Schema, model } from "mongoose";
import validator from 'validator';

interface Token{
    _id: string,
    token: string
}

interface User{
    username:string,
    email:string,
    password:string,
    avatar?:Buffer,
    tokens?: Token[]
}

const userSchema = new Schema<User>({
    username: { 
        type: String, 
        required:true,
        minlength: 5
    },
    email: { 
        type:String, 
        required:true,
        validate(value:any){
            if(!validator.isEmail(value)){
                throw new Error('Invalid email')
            }
        }
    },
    password: { 
        type:String, 
        required:true,
        minlength: 6,
        validate(value:any){
            if(validator.matches(value, '/[Pp]assword/')){
                throw new Error('Password cant be password')
            }
        }
    },
    tokens: [
        {
            token: {
                type: String
            }
        }
    ],
    avatar:{
        type:Buffer
    }
}, {
    timestamps:true
})

const userModel = model<User>('user', userSchema);

export { userModel }