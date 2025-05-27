import express from "express"
import cors from "cors"


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

//import routes
import healthcheckRouter from "./routes/healthcheck.route.js";

//routes
app.use("/api/v1/healthcheck",healthcheckRouter)
//write where to want to serve this


export { app }