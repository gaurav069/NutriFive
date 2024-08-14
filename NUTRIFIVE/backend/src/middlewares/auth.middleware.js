import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/user.model.js";
dotenv.config()
const verifyJWT=asyncHandler(async(req,res,next)=>{
    //here we want to create a middleware that logs out the user
    //step-1 :using req.cookies find the access token,,,, for the mobile app it can be found in the req.headers also
    try {
        const token=req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","");
    
        if(!token){
            throw new ApiError(401,"Unauthorized Request.")
        }
        const decodedToken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
    
        const user=await User.findById(decodedToken._id).select("-password -refreshToken")
    
        //now check weather user exists or not
    
        if(!user){
            throw new ApiError(401,"Invalid access token.")
        }
        //user was found here

        //we will be using this as a middleware so adding the user would be benificial to next() to get ._id
        req.user=user
    
        next();
    } catch (error) {
        throw new ApiError(401,error?.message ||"invalid access token")
    }
})


const isLoggedIn=asyncHandler(async(req,_,next)=>{   //here instead or res we used '_' because its not getting used.
    //need token from the user
    try {
        const token=req.cookies?.accessToken || req.header("Authorization").replace("Bearer ","");
    
        if(!token){
            throw new ApiError(401,"You are not logged in.")
        }
        const decodedToken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
    
        if(!decodedToken){
            throw new ApiError(401,"Token is invalid")
        }
    
        const user=await User.findById(decodedToken._id).select("-password -refreshToken")
        if(!user){
            throw new ApiError(402,"No access to perform search operation try login again.")
        }
    
        req.user=user;
        next();
    } catch (error) {
        throw new ApiError(400,error?.message||"Something went wrong while verifying the user.")
    }
})


export {isLoggedIn,verifyJWT}