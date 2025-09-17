import React from 'react'
import { useAuth } from '../../context/Context'

const Navbar = () => {
    const {user,logout}=useAuth()
  return (
    <div className='flex justify-between h-12 bg-teal-500 items-center text-white px-5 font-serif'>
      <p className='font-seminbold
      text-2xl '>Welcome {user.name}</p>
      <button className='px-4 py-1 bg-teal-700 hover:bg-teal-800 cursor-pointer'onClick={logout}>Logout</button>
    </div>
  )
}

export default Navbar
