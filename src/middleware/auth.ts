import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const auth = (req:Request, res:Response, next:NextFunction) =>{

    const token = req.headers.authorization?.replace('Bearer ', '')

    //@ts-ignore
    const decoded = jwt.verify(token, process.env.SECRET)

    //@ts-ignore
    req.userData = {
        token,
        _id:decoded._id
    }

    next()
}

export { auth }