import { app } from './main'

const PORT = process.env.PORT

app.listen(PORT, ()=>{
    console.log(`Server up in port ${PORT}`);
})