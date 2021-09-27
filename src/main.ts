// core
import * as express from "express";
import './db/mongoose'

// routes
import userRouter from "./routes/userRoutes";
import recordRouter from "./routes/recordRoutes";
import exerciseRouter from "./routes/exerRoutes";

// consts and middleware
const PORT = process.env.PORT
const app = express()

app.use(express.json())
app.use(userRouter)
app.use(recordRouter)
app.use(exerciseRouter)

app.listen(PORT, ()=>{
    console.log(`Server up in port ${PORT}`);
})