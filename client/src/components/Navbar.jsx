import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav>
      <ul className='flex flex-row gap-4 p-2 bg-slate-300' >
        <li><Link to='/' >Home</Link></li>
        <li><Link to='/discover' >Discover</Link></li>
        <li><Link to='/search' >Search</Link></li>
        <li><Link to='/login' >Log In</Link></li>
        <li><Link to='/signup' >Sign Up</Link></li>
        <li><Link to='/profile' >Profile</Link></li>
      </ul>
    </nav>
  )
}

export default Navbar