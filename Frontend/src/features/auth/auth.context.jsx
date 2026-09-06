import { createContext,useState } from "react";

export const AuthContext=createContext()

export const AuthProvider=({children})=>{
     const [user, setUser]=useState(null)
     const [loading,setLoading]=useState(true)

   
     return (
        <AuthContext.Provider value={{user,setUser,loading,setLoading}}>
            {children}
        </AuthContext.Provider>
     )
}

// Any component inside AuthProvider can access:
// user
// setUser
// loading
// setLoading

// createContext
// Used to create a Context.
// Context allows data to be shared between components without manually passing props.

// What is children?
// Suppose your App.jsx has:
// <AuthProvider>
//     <App />
// </AuthProvider>
// Then here children means: <App />
// Basically: Whatever you put inside <AuthProvider>...</AuthProvider> becomes children.


