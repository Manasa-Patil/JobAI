const express=require("express")
// or const {Router}=require("express")

const authRouter=express.Router()
// or const authRouter=Router()

const authController=require("../controllers/auth.controller.js")
const authMiddleware=require("../middlewares/auth.middleware.js")


//POST - /api/auth/register
authRouter.post("/register",authController.registerUserController)

//post  -/api/auth/login
authRouter.post("/login",authController.loginUserController)

//get  -/api/auth/logout
//Clears token from user cookie and add the token in blacklist
authRouter.get('/logout',authController.logoutUserController)

//GET /api/auth/get-me
//get the current logged-in user details
//access- private

authRouter.get("/get-me",authMiddleware.authUser,authController.getMeController)



module.exports=authRouter