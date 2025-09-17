import axios from 'axios'
import React, { Children, createContext, useContext, useEffect } from 'react'
import { useState } from 'react'

const userContext=createContext()
const Context = ({children}) => {
    const [user,setUser]=useState(null)
     const[loading,setLoading]=useState(true)
    useEffect(()=>{
 const verifyUser= async ()=>{
   
   try {
     const token=localStorage.getItem('token')
     if(token){
      const response=await axios.get('http://localhost:5000/api/auth/verify',{
        headers:{
          'Authorization':`Bearer ${token}`
        }
      })
      console.log(response)
      if(response.data.success){
        setUser(response.data.user)
      }else{
        setUser(null)
        setLoading(false)
      }
      } 
  } catch (error) {
    console.log(error)
    if(error.response && !error.reponse.data.error){
      setUser(null)
    }
  }
  finally{
    setLoading(false)
  }
}
verifyUser()
    },[])
    const login=(user)=>{
setUser(user)

    }
    const logout=()=>{
setUser(null)
localStorage.removeItem('token')
    }
  return (
    <userContext.Provider value={{user,login,logout,loading}}>
     {children}
    </userContext.Provider>
      
  
  )
}
 // eslint-disable-next-line react-refresh/only-export-components
 export const useAuth=()=>useContext(userContext)
export default Context
