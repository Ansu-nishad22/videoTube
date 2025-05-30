import { v2 as cloudinary } from 'cloudinary';
import "dotenv/config"
import fs from "fs";


//configure cloudinary
cloudinary.config({ 
        cloud_name : process.env.CLOUDINARY_CLOUD_NAME, 
        api_key : process.env.CLOUDINARY_API_KEY , 
        api_secret : process.env.CLOUDINARY_API_SECRET 
    });



const uploadCloudinary = async (localFilePath) =>{
    try {
        if(!localFilePath) return null
        const response = await cloudinary.uploader.upload(
            localFilePath,{
                resource_type : "auto"
            }
        )
       console.log("file uploaded on cloudinary File src" +response.url);
        //onse the file is uploaded 
        fs.unlinkSync(localFilePath)
        return response
    }
     catch (error) {
        console.error("Cloudinary upload failed:", error)
        fs.unlinkSync(localFilePath)
        return null
    }
//     catch (error) {
//     console.error("Cloudinary upload failed:", error);
//     if (fs.existsSync(localFilePath)) {
//         fs.unlinkSync(localFilePath);
//     }
//     return null;
// }
}

const deleteFromCloudinary = async (publicId) =>{
    try {
        const result = await cloudinary.uploader.destroy(publicId)
        console.log("deleted from cloudinary. public id" , publicId);
        
    } catch (error) {
        console.log("error deleting from cloudinary",error);
        return null
        
    }
}

export {uploadCloudinary,deleteFromCloudinary}
