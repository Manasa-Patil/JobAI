const express=require("express")
const interviewRouter=express.Router()


const authMiddleware=require("../middlewares/auth.middleware.js")
const interviewController=require("../controllers/interview.controller.js")
const upload=require("../middlewares/file.middleware.js")


//POST /api/interview  
//desc - generate new interview report on the basis of user self description, resume pdf, job description
//access- PRIVATE 
interviewRouter.post("/",authMiddleware.authUser,upload.single("resume"),interviewController.generateInterviewReportController)

//get /api/interview/report/:interviewId
interviewRouter.get("/report/:interviewId",authMiddleware.authUser,interviewController.getInterviewReportByIdController)

//get /api/interview
interviewRouter.get("/",authMiddleware.authUser,interviewController.getAllInterviewReportsController)


module.exports=interviewRouter