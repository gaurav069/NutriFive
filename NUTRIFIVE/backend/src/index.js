
import connectDB from "./db/index.js";
import dotenv from 'dotenv'
import {app} from './app.js'
import { registerFoodJson } from "./controllers/food.controller.js";
dotenv.config()
connectDB()
.then(()=>{

    app.on("error",()=>{
        console.log("OOPS ! something went wrong:",error)
    })
    app.listen(process.env.PORT || 8000,()=>{
        console.log("server started at:",process.env.PORT)
    })
})
.catch((error)=>{
    console.log("connection failed:",error)
})