import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js"
import { uploadCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUSer = asyncHandler(async (req, res) => {

    const { fullname, email, username, password } = req.body

    //    validation
    //    if(fullName?.trim() == "")
    if (
        [fullname, username, email, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "all fields are required")
    }
    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new ApiError(400, "user with eamil or username already exist")
    }
    //    console.log(req.files)
    //    console.log("avatar path", avatarLocalPAth);
    console.log("req.files =", req.files);
    const avatarLocalPAth = req.files?.avatar?.[0]?.path
    const coverLocalPAth = req.files?.coverImage?.[0]?.path

    console.log("avatarLocalPAth =", avatarLocalPAth);
    console.log("coverLocalPAth =", coverLocalPAth);

    if (!avatarLocalPAth) {
        throw new ApiError(400, "avatar file is missing")
    }
    //sending images on cloudinary
    // const avatar = await uploadCloudinary(avatarLocalPAth)
    // // const coverImage = await uploadCloudinary(coverImage)
    // let coverImage = ""
    // if(coverLocalPAth){
    //     coverImage = await uploadCloudinary(coverImage)
    // }

    let avatar;
    try {
        avatar = await uploadCloudinary(avatarLocalPAth);
        if (!avatar) {
            throw new ApiError(500, "Avatar upload failed");
        }
        console.log("uploaded avatar", avatar);
    } catch (error) {
        console.error("Error uploading avatar:", error);
        throw new ApiError(500, "Failed to upload avatar");
    }

    let coverImage;
    try {
        if (coverLocalPAth) {
            coverImage = await uploadCloudinary(coverLocalPAth);
            if (!coverImage) {
                throw new ApiError(500, "Cover image upload failed");
            }
            console.log("uploaded cover image", coverImage);
        }
    } catch (error) {
        console.error("Error uploading cover image:", error);
        throw new ApiError(500, "Failed to upload cover image");
    }


    try {
        const user = await User.create({
            fullname,
            avatar: avatar.url,
            coverImage: coverImage?.url || "",
            email,
            password,
            username: username.toLowerCase()
        })
        const createduser = await User.findById(user._id).select(
            "-password -refereshToken"  //it has all the field except password and refereshtoken
        )
        if (!createduser) {
            throw new ApiError(500, "something went wrong while registering the user")

        }
        return res.status(201).json(new ApiResponse(200, createduser, "user registered successfully"))
    } catch (error) {
        console.log("user creation failed", error);

        if (avatar) {
            await deleteFromCloudinary(avatar.public_id)
        }
        if (coverImage) {
            await deleteFromCloudinary(coverImage.public_id)
        }
        throw new ApiError(500, "something went wrong while registering the user and images were deleted")

    }
})


export { registerUSer }