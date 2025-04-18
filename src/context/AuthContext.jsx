"use client"

import { createContext, useState, useContext, useEffect } from "react"

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in from localStorage
    const user = localStorage.getItem("user")
    if (user) {
      setCurrentUser(JSON.parse(user))
    }
    setLoading(false)
  }, [])

  const signup =  async (firstName,lastName,email, password) => {
    // In a real app, this would call an API
    const user = { id: Date.now().toString(), email, firstName,lastName }
    //backend request
    try{
      const res = await fetch('http://localhost:8080/auth/signup',{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          email,
          password,
          firstName,
          lastName
        })
      })
      const data = await res.json();
      console.log("signup data",data);
    }catch(err)
    {
      console.log("Error: ",err);
    }

    setCurrentUser(user)
    return user
  }

  const login = async (email, password) => {
    // Mock login - in a real app, this would validate against an API
    let user ={};
    //backend request
    try{
      const res = await fetch("http://localhost:8080/auth/login",{
        method:"POST",
        headers:{
          "Content-type":"application/json"
        },
        body:JSON.stringify({
          email,
          password
        }),
        credentials:"include"
      })
      if(!res.ok)
      {
        console.log("err occured");
        return null;
      }
      user = { id: Date.now().toString(), email, name: email.split("@")[0] }
      const data = await res.json();
      
      // console.log(data);
    }catch(err)
    {
      console.log("Error ",err);
    }

    setCurrentUser(user)
    return user
  }

  const logout = () => {
    localStorage.removeItem("user")
    setCurrentUser(null)
  }

  const value = {
    currentUser,
    signup,
    login,
    logout,
    loading,
  }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}
