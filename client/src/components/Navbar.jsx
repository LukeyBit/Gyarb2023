import React, { useState, useEffect, useCallback } from 'react'
import { BiMenu } from 'react-icons/bi'
import { NavLink, Link } from 'react-router-dom'
import secureLocalStorage from 'react-secure-storage'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../store/actions/userActions'


import logo from '../assets/demo_logo.svg'

const Navbar = () => {
  const dispatch = useDispatch()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [auth, setAuth] = useState(secureLocalStorage.getItem('isAuthorized') || false)
  const isAuthorized = useSelector(store => store.user.isAuthorized)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleLogout = useCallback(() => {
    dispatch(logoutUser())
    setAuth(false)
  }, [dispatch])

  useEffect(() => {
    if (isAuthorized) {
      setAuth(true)
    }
  }, [isAuthorized])

  return (
    <nav className='navbar'>
      <div className='navbar__container'>
        <div className='navbar__logo'>
          <Link to='/' aria-label='MealMaster Logo Link' className='flex items-center' >
            <img src={logo} className='navbar__logo-img' alt='MealMaster Logo' />
            <span className='navbar__logo-text hover:text-text-color-secondary'>MealMaster</span>
          </Link>
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
            <BiMenu size={30} />
          </button>
        </div>
        <div
          { ...(isMenuOpen ? { 'data-collapse-open': true, 'aria-hidden': false } : { 'data-collapse-open': false, 'aria-hidden': true }) }
          className={` navbar__menu ${isMenuOpen ? 'navbar__menu--open' : 'navbar__menu--closed'}`}
          id='navbar-cta'>
          <ul>
            <li>
              <NavLink to='/search' className='navbar__menu-link' >Search</NavLink>
            </li>
            {auth ? (
              <>
                <li>
                  <NavLink to='/discover' className='navbar__menu-link' >Discover</NavLink>
                </li>
                <li>
                  <NavLink to='/profile' className='navbar__menu-link' >Profile</NavLink>
                </li>
                <li>
                  <Link to='/' onClick={handleLogout} className='navbar__menu-link navbar__menu-link__logout'>Log out</Link>
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