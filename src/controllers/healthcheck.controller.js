import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const healthcheck = asyncHandler(async ( req , res) =>{
    // return res.status(200).json({message : "test Ok"})
    //its not a standard response 
    //standard response willl come from apiresponse whic we have already written 
    //which consist of status,data,message,success
    return res.status(200).json(new ApiResponse(200,"ok","health check passed"))
})

export {healthcheck}