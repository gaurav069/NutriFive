import {v2 as cloudinary} from "cloudinary";
import dotenv from 'dotenv'
import fs from "fs";
dotenv.config()
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const uploader= async(localFilePath)=>{

    //use try and catch

    try{
        if(!localFilePath) return null;

        //try to upload file
        const response =await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })
        //if control reached here means file has been sucessfully uploaded.
        fs.unlinkSync(localFilePath);
        
        return response;
    }catch(error){

        fs.unlinkSync(localFilePath);

        return null;
    }
}

export {uploader}