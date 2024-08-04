import mongoose from "mongoose";


const foodSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        index:true,
    },
    carbs:{
        type:Number,
        required:true,
        trim:true,
    },
    fiber:{
        type:Number,
        required:true,
        trim:true,
    },
    fat:{
        type:Number,
        required:true,
        trim:true,
    },
    calories:{
        type:Number,
        required:true,
        trim:true,
    },
    protein:{
        type:Number,
        required:true,
        trim:true,
    }
},{timestamps:true})


export const Food=mongoose.model("Food",foodSchema)