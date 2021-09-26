// core
import * as express from "express";
import './db/mongoose'

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json())

app.get('/', (req, res)=>{
    res.send({msg:'Server up and working'})
})

app.listen(PORT, ()=>{
    console.log(`Server up in port ${PORT}`);
})