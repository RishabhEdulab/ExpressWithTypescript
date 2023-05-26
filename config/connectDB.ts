import mongoose from "mongoose";

export const connectDB= async(url:string)=>{
    try{
        const dataBaseName={
            dbName:"demo",
        }
      await  mongoose.connect(url,dataBaseName)
      console.log("connect")
    }catch(error){
        console.log(error);
    }
}