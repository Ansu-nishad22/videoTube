import { v2 as cloudinary } from 'cloudinary';

//configure cloudinary
cloudinary.config({ 
        cloud_name : process.env.CLOUDINARY_CLOUD_NAME, 
        api_key : process.env.CLOUDINARY_API_KEY , 
        api_secret : process.env.CLOUDINARY_API_SECRET 
    });


const uploadCloudinary = async (localFlePath) =>{
    try {
        if(!localFlePath) return null
        const response = await cloudinary.uploader.upload(
            localFlePath,{
                resource_type : "auto"
            }
        )
       console.log("file uploaded on cloudinary File src" +response.url);
        //onse the file is uploaded 
        fs.unlinkSync(localFlePath)
        return response
    } catch (error) {
        fs.unlinkSync(localFlePath)
        return null
    }
}
