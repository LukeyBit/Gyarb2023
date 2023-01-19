import React, { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import secureLocalStorage from 'react-secure-storage'
import { useSelector, useDispatch } from 'react-redux'


import logo from '../assets/demo_logo.svg'

const Navbar = () => {
  const dispatch = useDispatch()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isAuthorized = useSelector(store => store.user.isAuthorized)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleLogout = () => {
    console.log('logout')
    dispatch({type: 'LOGOUT'})
  }

  useEffect(() => {
    if (isAuthorized) {
      secureLocalStorage.setItem('isAuthorized', true)
    }
  }, [isAuthorized])

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
              <NavLink to='/' className='navbar__menu-link' >Home</NavLink>
            </li>
            <li>
              <NavLink to='/discover' className='navbar__menu-link' >Discover</NavLink>
            </li>
            <li>
              <NavLink to='/search' className='navbar__menu-link' >Search</NavLink>
            </li>
            { secureLocalStorage.getItem('isAuthorized') ? (
              <>
                <li>
                <NavLink to='/profile' className='navbar__menu-link' >Profile</NavLink>
                </li>
                <li>
                  <Link onClick={handleLogout} className='navbar__menu-link navbar__menu-link__logout' reloadDocument >Log out</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to='/login' className='navbar__menu-link' >Log in</NavLink>
                </li>
                <li>
                  <NavLink to='/signup' className='navbar__menu-link' >Sign up</NavLink>
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