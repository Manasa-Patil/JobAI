const userModel=require("../models/user.model.js")
const tokenBlacklistModel=require("../models/blacklist.model.js")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")

async function registerUserController(req,res){
    const {username,email,password}=req.body;
    if(!username||!email||!password){
        return res.status(400).json({
            message:"PLease provide username,email,password"
        })
    } 

    const isUserAlreadyExists=await userModel.findOne({
        $or:[{email},{username}]
    })

    if(isUserAlreadyExists){
        return res.status(400).json({
            message:"Account already exists with this username or email address"
        })
    }

    const hashedPassword=await bcrypt.hash(password,10)

    const user=await userModel.create({
        username,
        email,
        password:hashedPassword
    })

    const token=jwt.sign(
        {
        id:user._id,
        username:user.username
        },
        process.env.JWT_SECRET,
       {expiresIn:"1d"}
    )

    res.cookie("token",token)


    //201- when new resource is created in backend
    return res.status(201).json({
        message:"User registered successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })
   

}

async function loginUserController(req,res){
    const {email,password}=req.body

     if(!email||!password){
        return res.status(400).json({
            message:"PLease provide email and password"
        })
    } 

    const user=await userModel.findOne( {email} )
    if(!user){
        return res.status(400).json({
            message:"invalid email or password"
        })
    }

    const isPasswordValid=await bcrypt.compare(password,user.password)
    if(!isPasswordValid){
        return res.status(400).json({
            message:"invalid email or password"
        })
    }

    const token=jwt.sign(
        {id:user._id,username:user.username},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    )

    res.cookie("token",token)

    return res.status(200).json({
        message:"user logged-in successfully",
        user:{
            id:user._id,
            email:user.email,
            username:user.username
        }
    })
}

async function logoutUserController(req,res){
    const token=req.cookies.token
    if(token){
            await tokenBlacklistModel.create({token})
    }
    res.clearCookie("token")

     res.status(200).json({
        message:"User logged out successfully"
    })

}

async function getMeController(req,res){
     const user=await userModel.findById(req.user.id)
     res.status(200).json({
        message:"user details fetched successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
     })
 
}

//exporting an object with several properties
module.exports={
    registerUserController,
    loginUserController,
    logoutUserController,
    getMeController
}



