import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='navbar'>
      <div className='navbar__container'>
        <div className='navbar__logo'>
          <img src='https://flowbite.com/docs/images/logo.svg' className='navbar__logo-img' alt='MealMaster Logo' />
          <span className='navbar__logo-text'>MealMaster</span>
        </div>
        <div className='navbar__cta'>
          <button type='button' className='navbar__cta-btn'>Get started</button>
          <button data-collapse-toggle='navbar-cta' type='button' className='navbar__menu-btn' aria-controls='navbar-cta' aria-expanded='false'>
            <span className='sr-only'>Open main menu</span>
            <svg className='w-6 h-6' aria-hidden='true' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
              <path fill-rule='evenodd' d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z' clip-rule='evenodd' />
              </svg>
          </button>
        </div>
        <div className='navbar__menu' id='navbar-cta'>
          <ul>
            <li>
              <Link to='/' className='navbar__menu-link navbar__menu-link--active'>Home</Link>
            </li>
            <li>
              <Link to='/discover' className='navbar__menu-link '>Discover</Link>
            </li>
            <li>
              <Link to='/search' className='navbar__menu-link'>Search</Link>
            </li>
            <li>
              <Link to='/login' className='navbar__menu-link'>Log in</Link>
            </li>
            <li>
              <Link to='/signup' className='navbar__menu-link'>Sign up</Link>
            </li>
            <li>
              <Link to='/profile' className='navbar__menu-link'>Profile</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar