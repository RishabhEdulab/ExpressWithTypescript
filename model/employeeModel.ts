import mongoose from "mongoose";
const {Schema,model}=mongoose

const employeeSchema=new Schema({
    name:String,
    email:String,
    password:String,
    age:Number ,
    date:Date  ,
    fileUpload:String,
    selectProgramming:String,
    gender:String,
    languageCheckbox:String
})
const employeeModel=model("ExpressTypescript",employeeSchema)

export default employeeModel