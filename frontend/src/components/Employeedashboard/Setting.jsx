import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/Context';
import { useState } from 'react';
import axios from 'axios';

const Setting = () => {
    const navigate=useNavigate()
    const{user}=useAuth()
    const[setting,setSetting]=useState({
        userId:user._id,
        oldPassword:'',
        newPassword:'',
        confirmPassword:'',
    })
    const [error,setError]=useState(null)
    const handleChange=(e)=>{
        const {name,value}=e.target
        setSetting({...setting,[name]:value})
    }
    const handleSubmit=async(e)=>{
        e.preventDefault()
        if(setting.newPassword!==setting.confirmPassword){
            setError('password not match')
        }
        else{
            try {
                const response=await axios.put("https://employee-management-system-mern-sta-ten.vercel.app/api/setting/change-password",
                setting,{
                    headers:{
                       Authorization:`Bearer ${localStorage.getItem('token')}`
                    }
                }
            )
            if(response.data.success){
                navigate('/admin-dashboard/employees')
                setError('')
            }
            } catch (error) {
                if(error.response && !error.response.data.success){
                    setError(error.response.data.error)
                }
                
            }
        }
    }
  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
      <h2 className="text-2xl font-bold mb-6">ChangePassword</h2>
      <p className="text-red-500">{error}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="text-sm font-medium text-gray-700">
            Old Password
          </label>
          <input
            type="password"
            name="oldPassword"
            placeholder="Change Password"
            className="mt-1 w-full p-2 border border-gray-200 rounded-md"
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">
            New Password
          </label>
          <input
            type="password"
            name="newPassword"
            placeholder="Change Password"
            className="mt-1 w-full p-2 border border-gray-200 rounded-md"
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="mt-1 w-full p-2 border border-gray-200 rounded-md"
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="w-full mt-6 bg-teal-400 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded"
        >
       Change Password
        </button>
      </form>
    </div>
  );
    
}

export default Setting
