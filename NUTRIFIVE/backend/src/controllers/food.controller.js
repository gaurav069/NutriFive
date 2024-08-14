import { asyncHandler } from "../utils/asyncHandler.js";
import fs from "fs";
import { ApiError } from "../utils/apiError.js";
import {Food} from "../models/food.model.js"
import {Track} from "../models/track.model.js"
import dotenv from "dotenv"
import { ApiResponse } from "../utils/apiResponse.js";

dotenv.config()



const searchFood=asyncHandler(async(req,res)=>{


    try {
        const foodName=req.params.name
        // console.log(foodName);
        const food=await Food.find({
            name:{
                $regex:foodName,
                $options:'i',
            },
        }).select("-createdAt -updatedAt -__v")
        if (food.length>0) {
            res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    food,
                    "Search Successful"
                )
            )
        }else{
            res
            .status(400)
            .json(
                new ApiResponse(401,"Food Item is either Not available or not a valid search.","Enter a valid food item.")
            )
        }
    } catch (error) {
        throw new ApiError(404,error?.message)
    }

})
const registerFoodJson=asyncHandler(async(req,res)=>{

    try{
        const {foodItems}=req.body;
        Food.insertMany(foodItems);

        res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {},
                "Uploaded Bulk JSON Data sucessfully."
            )
        )
    }catch(error){
        throw new ApiError(402,"Something went wrong while uploading json Data.")
    }
})
const trackFood=asyncHandler(async(req,res)=>{
    const food=req.body;
    try{

        const data=await Track.create(food);
        res
        .status(201)
        .json(
            new ApiResponse(
                201,
                data._id,
                "Food Tracked Successfully."
            )
        )
    }catch(error){
        throw new ApiError(402,"Error while adding to track User Food")
    }
})
const trackMyFood=asyncHandler(async(req,res)=>{
    const userid=req.body.userId;
    console.log(userid)
    try {
        const data = await Track.find({ userId: userid })
    .populate('foodId')
    .populate('userId');

        res.json(
            new ApiResponse(
                201,
                data,
                "Fetching Done!!"
            )
        )
    } catch (error) {
        throw new ApiError(403,"Something went wrong while fetching the user tracked food.")
    }
})

const deleteTrackedFood=asyncHandler(async(req,res)=>{
    const userid=req.body.userId;
    const foodid=req.body.foodId;
    const qntity=req.body.quantity

   try {
     const data=await Track.findOneAndDelete({
        $and:[
            {userId:userid},
            {foodId:foodid},
            {quantity:qntity}
        ]
     })
     console.log(data)
     if(data)
    {
        res.json(
            new ApiResponse(
                210,
                data,
                "Food Item removed Sucessfully."
            )
        )
    }
    throw new ApiError(
        404,
        "Something went wrong while performing delete operation"
    )
   } catch (error) {
    throw new ApiError(500,"Something went wrong while removing food Item from Tracking Database.")
   }
})


const trackByDate=asyncHandler(async(req,res)=>{
    const date=req.params.date;
    const user=req.user;

    //extracted date from req.params
    console.log(date)

    try{

        const data=await Track.find({userId:user._id,eatDate:date})

        res.json(
            new ApiResponse(
                200,
                data,
                "Data Fetch is sucessful"
            )
        )
    }catch(err){
        throw new ApiError(
            500,
            err?.message || "Failed to load Info from given Date"
        )
    }
})
export {searchFood,registerFoodJson,trackFood,trackMyFood,deleteTrackedFood,trackByDate}