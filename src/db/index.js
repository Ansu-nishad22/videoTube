import mongoose from "mongoose";

const connectdb = async ()=>{
    try {
        console.log("trying to connect with database");
        await mongoose.connect(`${process.env.MONGODB_URL}`)
        console.log("succesfully connected to database");
        
    } catch (error) {
        console.log("mongodb connection failed");
        process.exit(1)
    }
}
export {connectdb}