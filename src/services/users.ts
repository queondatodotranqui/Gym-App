import { Request , Response } from 'express';
import { userModel } from '../models/user';

const signUp = async (req:Request , res:Response)=>{

    try{
        const data = new userModel({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })

        await data.save()
        const token = await data.generateToken()

        return res.status(201).send({msg:'Created', data, token})
    } 
    catch(e:any){
        return res.status(400).send({msg:'Bad request', error: e.message})
    }
}

const login = async (req:Request, res:Response)=>{

    try{
        const user = await userModel.findOne({email: req.body.email, password: req.body.password})
        if(!user){
            throw new Error()
        }
        const token = await user.generateToken()

        return res.status(200).send({msg:'Success', user, token})
    }
    catch(e:any){
        return res.status(404).send({msg:'Not found'})
    }
}

const getProfile = async (req:Request, res:Response)=>{
    
    try{
        //@ts-ignores
        const userInfo = await userModel.findById(req.userData._id)

        return res.status(200).send({msg:'Success', userInfo})
    }
    catch(e){
        return res.status(500).send({msg:'Error', e}) // this part doesnt get covered by the tests
    }
}

const updateProfile = async (req:Request, res:Response)=>{

    const allowed = ['username', 'password', 'avatar']
    const updated = Object.keys(req.body)

    const isValid = updated.every((item) =>{return allowed.includes(item)})

    if(!isValid){
        return res.status(400).send({msg:'Bad request'})
    }

    try{
        const data = req.body;
        //@ts-ignore
        const { user } = req.userData;

        updated.forEach((item)=>{
            user[item] = data[item]
        })

        await user.save()
        return res.status(200).send({msg:'Success', user})
    }
    catch(e:any){
        return res.status(400).send({msg:'Error', error:e.message})
    }
}

export {
    signUp,
    login,
    getProfile,
    updateProfile
}