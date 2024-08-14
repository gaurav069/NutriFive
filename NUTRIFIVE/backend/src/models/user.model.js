import mongoose,{Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const userSchema=new mongoose.Schema(
    {
        username:{
            type: String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
            index:true //enable searching
        },
        email:{
            type: String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
        },
        fullname:{
            type: String,
            required:true,
            trim:true,
            index:true //enable searching
        },
        avatar:{
            type:String, //url se fetch hoga
            // required:true,
        },
        password:{
            type: String,
            required:[true,'password is required'],
        },
        refreshToken:{
            type: String
        }
    },
    {
        timestamps:true //created at,updated at
    }
)


userSchema.pre("save",async function(next){

    if(this.isModified("password")){
        this.password=await bcrypt.hash(this.password,10);
    }
    next();
})


userSchema.methods.isPasswordCorrect =async function(password){
    return await bcrypt.compare(password,this.password) //need user to send pass then bcrypt will do the job
}

userSchema.methods.generateAccessToken=function(){
   return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            fullname:this.fullname,
            username:this.username
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken=function(){
    return jwt.sign(
        {
            _id:this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User=mongoose.model("User",userSchema)