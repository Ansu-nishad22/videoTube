import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";


const userSchema = new Schema(
    {
      username : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
        index : true
      },
      email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
      },
      fullname : {
        type : String,
        required : true,
        trim : true,
        index : true
      },
      avatar : {
        type : String, //cloudunary url
        required : true,
      },
      coverImage : {
        type : String, //cloudunary url   
      },
      watchHistory : [
        {
           type : Schema.Types.ObjectId,
           ref : "Video"  //we have to mention from which schema you are refering this 
        }
      ],
      password : {
        type : String,
        required : [true, "Password is required"] //first element must be boolean and second is the message you want to pass to the frontend if this field was not there and this can be done in anywhere

      },
      refereshToken:{
        type : String  
      }

    },
 
    {timestamps : true}
)
userSchema.pre("save" , async function (next){
    //if the modifired field is not a password then return next
    //fixed in registration video
     if (!this.isModified("password")) return next()
    //if the modifird field is password or you are updating the password then then run this code
    this.password = bcrypt.hash(this.password, 10)


    next()
})

userSchema.methods.isPasswordCorrect = async function (password){
    return await bcrypt.compare(password,this.password)
}
//it takes the user password and data base password and try to match them but the db password is encrypted and the user password is in normal text ..
//bt we can convert that also in encrypted an match them but we dont need to match it manually
//so we use bcrypt

userSchema.methods.generateAccessToken = function (){
  //short lived access token       
  return jwt.sign({
    _id : rhis._id,  //when we destructured my token i can grab this info
    email : this.email,
    username : this.username,
    fullname : this.fullname
  },process.env.ACCESS_TOKEN_SECRET,   //secret msg or info
  {expiresIn : process.env.ACCESS_TOKEN_EXPIRY}
)
}

userSchema.methods.generateRefreshToken = function (){
  //long lived refresh token       
  return jwt.sign({
    _id : rhis._id,  //when we destructured my token i can grab this info
  },process.env.REFRESH_TOKEN_SECRET,   //secret msg or info
  {expiresIn : process.env.REFRESH_TOKEN_EXPIRY}
)
}

export const User =mongoose.model("User" , userSchema)