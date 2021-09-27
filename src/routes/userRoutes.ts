import * as express from 'express';

const userRouter = express.Router()

userRouter.get('/', (req, res)=>{
    res.send({msg:'Server up and working'})
})

export default userRouter;