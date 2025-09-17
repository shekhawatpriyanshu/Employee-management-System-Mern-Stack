import React, { useState } from 'react'
import axios from 'axios'
import { useAuth } from '../context/Context'
import { useNavigate } from 'react-router-dom'
const Login = () => {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const navigate=useNavigate()
    const {login}=useAuth()
    const [error,setError]=useState(null)
    const handleSubmit=async(e)=>{
        e.preventDefault();// prevent default submission of form
try {
   const response=await axios.post('https://employee-management-system-mern-sta-ten.vercel.app/api/auth/login',{email,password}

   )
   if(response.data.success){
    login(response.data.user)
    localStorage.setItem('token',response.data.token)
    if(response.data.user.role==='admin'){
navigate('/admin-dashboard')
    }else{
        navigate('/employee-dashboard')
    }
   }
  
} catch (error) {
    if(error.response && !error.response.data.success){
setError(error.response.data.error)
    }
    else{
        setError('server error')
    }
}

    }
  return (
    <div className='flex flex-col items-center h-screen justify-center bg-gradient-to-b from-teal-600 from-50% to-gray-100 to-50% space-y-6'>
      <h2 className='font-sans-serif text-3xl text-white'>Employee Mangament System</h2>
      <div className='border shadow p-6 w-80 bg-white'>
        <h2 className='text-2xl font-bold mb-4'>
            Login
        </h2>
       {error && <p className='text-red-500'>{error}</p>} 
      <form onSubmit={handleSubmit} >
        <div className='mb-4'>
            <label htmlFor="email" className='block text-gray-700'
            >Email
            </label>
            <input type="email" placeholder='Enter E-mail' className='w-full px-3 py-2 border'onChange={(e)=>setEmail(e.target.value)} required />
        </div>
        <div>
            <label htmlFor="password" className='block text-gray-700'>
                Password
            </label>
            <input type="password" placeholder='**********'  className='w-full px-3 py-2 border' onChange={(e)=>setPassword(e.target.value)} required/>
        </div>
        <div className='mb-4 flex items-center justify-between'>
            <label className='inline-flex items-center'>

<input type="checkbox" className='from-checkbox' />
<span className='ml-2 text-gray-700'>  Remember Me</span>
            </label>
            <a href="#"  className='text-teal-600'>Forgot password??</a>
        </div>
        <div className='mb-4'>

        <button
        className='w-full bg-teal-600 text-white py-2 cursor-pointer'>Login</button>
        </div>

      </form>
            </div>
    </div>
  )
}

export default Login
