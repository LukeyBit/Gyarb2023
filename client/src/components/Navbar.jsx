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
    <nav className='bg-white border-gray-200 px-2 sm:px-4 py-2.5 -z-10 drop-shadow-xl'>
      <div className='container min-w-full flex flex-wrap items-center justify-end px-4'>
        <div className='flex items-center mr-auto'>
          <Link to='/' aria-label='MealMaster Logo Link' className='flex items-center' >
            <img src={logo} className='h-6 mr-3 sm:h-9' alt='MealMaster Logo' />
            <span className='self-center text-3xl title-font whitespace-nowrap text-text-color-primary hover:text-text-color-secondary'>MealMaster</span>
          </Link>
        </div>
        <div className='flex md:order-2'>
          <button
            data-collapse-toggle='navbar-cta'
            type='button' className='inline-flex items-center p-2 text-sm text-primary rounded-lg md:hidden hover:bg-secondary hover:text-white focus:outline-none focus:ring-2 focus:ring-primary px-5 py-2.5 text-center mr-3 md:mr-0 md:ml-2'
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
          className={` items-center justify-between md:justify-center w-full md:flex md:w-auto ease-in-out md:order-1 duration-300 md:text-center md:justify-items-center${isMenuOpen ? 'translate-y-0 h-full opacity-100' : '-translate-y-[1000vh] hidden opacity-0 md:translate-y-0 md:h-full md:opacity-100'}`}
          id='navbar-cta'>
          <ul className='flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-fill-color md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white'>
            <li>
              <NavLink to='/search' className='text-font block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-text-color-secondary md:p-0 md:border-none' >Search</NavLink>
            </li>
            {auth ? (
              <>
                <li>
                  <NavLink to='/discover' className='text-font block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-text-color-secondary md:p-0 md:border-none' >Discover</NavLink>
                </li>
                <li>
                  <NavLink to='/profile' className='text-font block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-text-color-secondary md:p-0 md:border-none' >Profile</NavLink>
                </li>
                <li>
                  <Link to='/' onClick={handleLogout} className='text-font block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-text-color-secondary md:p-0 md:border-none cursor-pointer text-red-600 hover:text-red-800 !important'>Log out</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to='/login' className='text-font block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-text-color-secondary md:p-0 md:border-none' >Log in</NavLink>
                </li>
                <li>
                  <NavLink to='/signup' className='text-font block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-text-color-secondary md:p-0 md:border-none' >Sign up</NavLink>
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