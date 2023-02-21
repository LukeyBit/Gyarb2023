import React, { useState } from 'react'

const Filters = () => {
  const [dropdownOpen, setDropdownOpen] = React.useState(false)

  const openMenu = () => {
    setDropdownOpen(!dropdownOpen)
  }

  return (
    <div className='mr-10 w-1/6 h-[calc(100vh-5vh)] scroll-m-1 top-0 bg-white drop-shadow-2xl' >
      <div className='flex flex-col justify-center'>

        <button id='dropdownBgHoverButton' data-dropdown-toggle='dropdownBgHover' className='subtitle-font w-full flex flex-row justify-center align-middle hover:bg-secondary' type='button' onClick={openMenu}>Dropdown checkbox
          <svg className='w-4 h-4 ml-2 my-auto' aria-hidden='true' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
            <path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'></path>
          </svg>
        </button>

        <div id='dropdownBgHover' className={`z-10 w-48 bg-white rounded-lg shadow dark:bg-gray-700 ${dropdownOpen ? null : 'hidden'}`} >
          <ul className='p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200' aria-labelledby='dropdownBgHoverButton'>
            <li>
              <div className='flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600'>
                <input id='checkbox-item-4' type='checkbox' value='' className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500' />
                <label htmlFor='checkbox-item-4' className='w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300'>Default checkbox</label>
              </div>
            </li>
            <li>
              <div className='flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600'>
                <input id='checkbox-item-5' type='checkbox' value='' className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500' />
                <label htmlFor='checkbox-item-5' className='w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300'>Checked state</label>
              </div>
            </li>
            <li>
              <div className='flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600'>
                <input id='checkbox-item-6' type='checkbox' value='' className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500' />
                <label htmlFor='checkbox-item-6' className='w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300'>Default checkbox</label>
              </div>
            </li>
          </ul>
        </div>

      </div>
    </div>
  )
}

export default Filters