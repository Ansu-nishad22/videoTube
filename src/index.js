import "dotenv/config"
import { app } from "./app.js";
import { connectdb } from "./db/index.js";


// console.log("Loaded port:", process.env.PORT);

let port = process.env.PORT || 3000

// app.listen(port , ()=>{
//     console.log(`server is running ${port}`);
//     connectdb()
// })

connectdb()
.then(()=>{
    app.listen(port , ()=>{
    console.log(`server is running ${port}`);
})
})
.catch((err) =>{
    console.log("mongodb connection error")
})