import * as express from 'express';
import { auth } from '../middleware/auth'
import * as user from '../services/users'

const userRouter = express.Router()


userRouter.post('/signup', user.signUp)

userRouter.post('/login', user.login)

userRouter.get('/me', auth, user.getProfile)

userRouter.patch('/me', auth,  user.updateProfile)

export default userRouter;