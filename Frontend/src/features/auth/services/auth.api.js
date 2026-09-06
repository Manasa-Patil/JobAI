import axios from "axios";


export async function register({ username, email, password }) {
  try {
    const response=await axios.post(
      "http://localhost:3000/api/auth/register",
      {
        username,
        email,
        password,
      },
      //to give access of cookie for ur backend server, so that the server can read from cookie or set anything(ex jwt token) into the cookie
      { withCredentials: true },
    );

    return response.data

  } catch (err) {
    console.log(err)
  }

}

export async function login({email,password}){
    try{
       const response=await axios.post("http://localhost:3000/api/auth/login",{
        email,password
       }, //to give access of cookie for ur backend server
       {withCredentials:true})

       return response.data
    }catch(err){
        console.log(err)
    }
}

export async function logout(){
    try{
       const response= await axios.get("http://localhost:3000/api/auth/logout",{
            withCredentials:true
        })

        return response.data
    }
    catch(err){
        console.log(err)
    }
}




export async function getMe(){
try{
     const response=await axios.get("http://localhost:3000/api/auth/get-me",{
        withCredentials:true
        //to give access of cookie for ur backend server
    })

    return response.data 

}catch(err){
    console.log(err)
    throw(err)
}
}
