import * as express from 'express';
import { userModel } from '../models/user';

const userRouter = express.Router()


userRouter.post('/signup', async (req , res)=>{

    try{
        const data = new userModel({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })

        await data.save()

        res.status(201).send({msg:'Created', data})
    } 
    catch(e:any){
        res.status(400).send({msg:'Bad request', error: e.message})
    }
})

userRouter.get('/', (req, res)=>{
    res.send({msg:'Success'})
})

export default userRouter;