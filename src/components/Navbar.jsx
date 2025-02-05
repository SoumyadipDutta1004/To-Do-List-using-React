import React from 'react'

const Navbar = () => {
  return (
    <nav className="flex justify-around items-center bg-black p-4 text-white">
      <div className="logo">
        <span className="font-bold text-2xl cursor-pointer text-gradient">To-Do List</span>
      </div>
      <ul className="flex gap-8">
        <li className="cursor-pointer hover:text-purple-400 transition-all duration-200">Home</li>
        <li className="cursor-pointer hover:text-purple-400 transition-all duration-200">Your Tasks</li>
      </ul>
    </nav>
  )
}

export default Navbar