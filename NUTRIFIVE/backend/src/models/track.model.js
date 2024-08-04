import mongoose from "mongoose";


const trackSchema=new mongoose.Schema({
    //userid
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    //foodid
    foodId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Food",
        required:true
    },
    eatDate: {
        type: String,
        default: () => {
            const today = new Date();
            const day = String(today.getDate()).padStart(2, '0');
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const year = today.getFullYear();
            return `${day}-${month}-${year}`;
        }
    },
    //quantity
    quantity:{
        type:Number,
        required:true,
        min:1
    }
},{timestamps:true})


export const Track=mongoose.model("Track",trackSchema)