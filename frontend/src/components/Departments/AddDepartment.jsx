import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const AddDepartment = () => {
    const[department,setDepartment]=useState({
        dep_name:'',
        description:''
    })
    const navigate=useNavigate();
    const handleChange=(e)=>{
        const {name,value}=e.target
        setDepartment({...department,[name]:value})
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
try {
    const response=await axios.post('http://localhost:5000/api/department/add',
      department,{
      headers:{
        "Authorization":`Bearer ${localStorage.getItem('token')}`
      }
    })
    if(response.data.success){
      navigate('/admin-dashboard/departments')
    }
} catch (error) {
    if(error.response && !error.response.data.success){
        alert(error.response.data.error)
    }
}

    }
  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
      <h2 className="text-2xl font-bold mb-6">Add New Department</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="dep_name"
            className="text-sm font-medium text-gray-700"
          >
            Department Name
          </label>
          <input
            type="text"
            name="dep_name"
            value={department.dep_name}
            placeholder="Enter Dep Name"
            className="mt-1 w-full p-2 border border-gray-200 rounded-md"
            onChange={handleChange}
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            name="description"
            value={department.description}
            onChange={handleChange}
            placeholder="Description"
            className="mt-1 w-full p-2 border border-gray-200 rounded-md"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full mt-6 bg-teal-400 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded"
        >
          Add Department
        </button>
      </form>
    </div>
  );
}

export default AddDepartment
