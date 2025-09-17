import React from 'react'
import { useAuth } from '../context/Context'
import AdminSidebar from '../components/dashboard/AdminSidebar'
import Navbar from '../components/dashboard/Navbar'
import AdminSummary from '../components/dashboard/AdminSummary'
import { Outlet } from 'react-router-dom'

const AdminDashboard = () => {
  // eslint-disable-next-line no-unused-vars
  const {user}=useAuth()
  
  return (
    <div className='flex'>
      <AdminSidebar/>
      <div className='flex-1 ml-64 bg-gray-100 h-screen'>

      <Navbar/>
     <Outlet/>
      </div>
    </div>
  )
}

export default AdminDashboard
