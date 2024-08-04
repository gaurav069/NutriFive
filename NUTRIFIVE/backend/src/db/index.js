import mongoose from "mongoose";
import {DB_NAME} from "../constants.js"
const connectDB=async()=>{
    try{
        const connectInstance=await mongoose.connect(`${process.env.MONGO_DB_URI}/${DB_NAME}`)
        console.log("db connection is sucessful with host:",connectInstance.connection.host)
    }catch(error){
        console.log("mongodb connection failed with error:",error)
        process.exit(1)
    }
}


export default connectDB