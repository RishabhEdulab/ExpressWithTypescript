import express,{Response,Request} from 'express'
import dotenv from 'dotenv'
import { connectDB } from "../config/connectDB";
import router from '../router/userAuthentication'

dotenv.config({path:"./config.env"})
const port:number=Number(process.env.PORT)
const url:string | undefined=process.env.URL
console.log(url);
connectDB(url??"undefined url")
const app=express()
app.use(express.json());

app.use("/user",router)
app.get("/",(request:Request,response:Response)=>{
    response.status(200).send({status:"success",message:"get data from database..."})
})

app.listen(port,()=>{
    console.log(`listening on ${port}`)
})