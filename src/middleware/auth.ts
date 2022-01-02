import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { userModel } from '../models/user';

const auth = async (req:Request, res:Response, next:NextFunction) =>{

    try{
        //@ts-ignore
        const token = req.headers.authorization.replace('Bearer ', '')

        //@ts-ignore
        const decoded = jwt.verify(token, process.env.SECRET)

        const user = await userModel.findOne({_id:decoded._id, 'tokens.token': token})

        //@ts-ignore
        req.userData = {
            token,
            user
        }

        next()
    }
    catch(e:any){
        return res.status(401).send({error:'Please authenticate'})
    }
}

export { auth }