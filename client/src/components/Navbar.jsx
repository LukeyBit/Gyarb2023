import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import secureLocalStorage from 'react-secure-storage'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../store/actions/user'

import logo from '../assets/demo_logo.svg'

const Navbar = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }


  const handleLogout = (e) => {
    dispatch(logoutUser())
    navigate('/')
  }

  return (
    <nav className='navbar'>
      <div className='navbar__container'>
        <div className='navbar__logo'>
          <img src={logo} className='navbar__logo-img' alt='MealMaster Logo' />
          <span className='navbar__logo-text'>MealMaster</span>
        </div>
        <div className='navbar__buttons'>
          <button type='button' className='navbar__cta-btn'>Get started</button>
          <button
          data-collapse-toggle='navbar-cta'
          type='button' className='navbar__menu-btn'
          aria-controls='navbar-cta'
          aria-expanded='false'
          onClick={toggleMenu}
          >
            <span className='sr-only'>Open main menu</span>
            <svg className='w-6 h-6' aria-hidden='true' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
              <path fillRule='evenodd' d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z' clipRule='evenodd' />
              </svg>
          </button>
        </div>
        <div 
        {...(isMenuOpen ? {'data-collapse-open': true, 'aria-hidden': false} : {'data-collapse-open': false,'aria-hidden': true})
        }
        className={` navbar__menu ${isMenuOpen ? 'navbar__menu--open' : 'navbar__menu--closed'}`}
        id='navbar-cta'>
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
            {secureLocalStorage.getItem('profile') && JSON.parse(secureLocalStorage.getItem('profile')).loggedIn ? (
              <>
                <li>
                <Link to='/profile' className='navbar__menu-link'>Profile</Link>
                </li>
                <li>
                  <Link to='/' onClick={handleLogout} className='navbar__menu-link navbar__menu-link__logout'>Log out</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to='/login' className='navbar__menu-link'>Log in</Link>
                </li>
                <li>
                  <Link to='/signup' className='navbar__menu-link'>Sign up</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar