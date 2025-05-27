import mongoose, { Schema } from "mongoose";

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

export const User =mongoose.model("User" , userSchema)