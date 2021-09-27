import * as express from 'express';

const userRouter = express.Router()

userRouter.get('/', (req, res)=>{
    res.send({msg:'Success'})
})

export default userRouter;