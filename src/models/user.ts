import { Schema, model } from "mongoose";
import validator from 'validator';
import * as jwt from 'jsonwebtoken'


interface Token{
    _id: string,
    token: string
}

interface User{
    username:string,
    email:string,
    password:string,
    avatar?:Buffer,
    tokens?: Token[],
    birthday?: Date,
    height?:number,
    weight?:number,
    generateToken: Function
}

const userSchema = new Schema<User>({
    username: { 
        type: String, 
        required:true,
        minlength: 5,
        unique:true
    },
    email: { 
        type:String, 
        required:true,
        unique:true,
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
        validate(value:string){
            if(value.toLowerCase().match(/password/)){
                throw new Error('Password cannot be password');
            }
        }
    },
    birthday:{
        type:Date
    },
    height:{
        type:Number,
        min:50,
        max:230
    },
    weight:{
        type:Number,
        min:30,
        max:300
    },
    tokens: [
        {
            token: {
                type: String,
                required:true
            }
        }
    ],
    avatar:{
        type:Buffer
    }
}, {
    timestamps:true
})

userSchema.methods.generateToken = async function ():Promise<string>{

    const user = this

    // @ts-ignore
    const token = jwt.sign({_id: user._id.toString()}, process.env.SECRET) 
    user.tokens = user.tokens.concat({token})
    await user.save()

    return token;
}

const userModel = model<User>('user', userSchema);

export { 
    userModel,
    User
}