import React, { useState } from 'react'
import "../auth.form.scss"
import { useNavigate,Link } from 'react-router'
import {useAuth} from "../hooks/useAuth.js"

const login = () => {
  const navigate=useNavigate()
  const {loading,handleLogin}=useAuth()
  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")
  
  const handleSubmit=async (e)=>{
    e.preventDefault()
    await handleLogin({email,password})
    navigate("/")
  }

  if(loading){
    return(
      <main>
        Loading.........
      </main>
    )
  }

  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input onChange={(e)=>{
              setEmail(e.target.value)
            }}
            type="email" id="email" name="email" placeholder='Enter email adress'/>
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input 
            onChange={(e)=>{setPassword(e.target.value)}}
            type="text" id="password" name="password" placeholder='Enter password' />
          </div>

           <button class="button primary-button">Login</button>
        </form>
        
        <p>Don't have an account? <Link to={"/register"}>Register</Link> </p>
      </div>
        
    </main>
  )
}

export default login
