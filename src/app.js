import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express();

app.use(
    cors({
        origin : process.env.CORS_ORIGIN,
        credentials: true

    })
)
//middleware....cors defines what should allowed and what should not be allowed
app.use(express.json({limit : "16kb"}))
app.use(express.urlencoded({extended : true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

//import routes
import healthcheckRouter from "./routes/healthcheck.route.js";
import userRoute from "./routes/user.route.js"

//routes
app.use("/api/v1/healthcheck",healthcheckRouter)
app.use("/api/v1/users",userRoute)
//write where to want to serve this


export { app }