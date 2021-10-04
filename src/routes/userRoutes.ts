import * as express from 'express';
import { userModel } from '../models/user';
import * as jwt from 'jsonwebtoken'
import { auth } from '../middleware/auth'

const userRouter = express.Router()


userRouter.post('/signup', async (req , res)=>{

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
})

userRouter.post('/login', async (req, res)=>{

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
})

userRouter.get('/me', auth,  async (req, res)=>{
    
    try{
        //@ts-ignores
        const user = await userModel.findById(req.userData._id)

        return res.status(200).send({msg:'Success', user})
    }
    catch(e){
        return res.status(400).send({msg:'Error', e})
    }
})

userRouter.patch('/me', async (req, res)=>{

    try{
        return res.status(200).send({msg:'Success'})
    }
    catch(e:any){
        return res.status(400).send({msg:'Error', error:e.message})
    }
})

export default userRouter;