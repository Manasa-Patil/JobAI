const express=require("express")
const app=express() //creating instance of the server
const cookieParser=require("cookie-parser")
const cors=require("cors")

app.use(express.json())
app.use(cookieParser());

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

// require all the routes here
const authRouter=require("./routes/auth.routes.js")
const interviewRouter=require("./routes/interview.routes.js")

//using all the routes here
app.use("/api/auth",authRouter)
// "/api/auth" is the prefix for all auth apis'

app.use("/api/interview",interviewRouter)


module.exports=app