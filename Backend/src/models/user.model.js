const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        unique:[true,"username already taken"],
        required:true
    },
    email:{
        type:String,
        unqiue:[true,"Account already exists with this email address"],
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

//model method in mongoose package helps to specify the collection name inside which the user data must exist
const userModel=mongoose.model("users",userSchema)

module.exports=userModel