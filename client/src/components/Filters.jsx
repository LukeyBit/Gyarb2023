import React, { useEffect, useState } from 'react'
import Filter from './Filter'
import { params } from '../apis/recipeAPI'
import { BiFilter, BiX } from 'react-icons/bi'
import { useWindowDimensions } from '../hooks'

/**
 * 
 * @returns {JSX.Element} Filters component
 * 
 * @description Filters component for the sidebar on the Search page containing the Filter components
 * 
 */
const Filters = () => {
  // recipeParams is the object containing the filter categories and their items
  const recipeParams = params.recipeParams
  // open is the state of the sidebar
  const [open, setOpen] = useState(false)
  // width is the width of the window
  const { width } = useWindowDimensions()

  /**
   * 
   * @returns {void}
   * 
   * @description Clears the filters in sessionStorage and reloads the page
   * 
   */
  const handleReset = () => {
    sessionStorage.removeItem('filters')
    window.location.reload()
  }

  // toggleMenu toggles the sidebar
  const toggleMenu = () => {
    setOpen(!open)
  }

  // useEffect hook to set the sidebar open state to false if the window width is greater than 1024px as the sidebar is always open on larger screens
  useEffect(() => {
    if (width > 1024) {
      setOpen(false)
    }
  }, [width])

  return (
    // The button to toggle the sidebar is always visible on mobile screens and is hidden on larger screens
    // The sidebar is always open on larger screens and is hidden on smaller screens
    // The sidebar is fixed to the left on larger screens and is toggled to cover the entire screen on smaller screens
    <>
      <button className={`fixed bottom-8  bg-primary rounded-full p-1.5 text-white z-[100] transition-all lg:hidden ${open ? 'left-[50%] right-[50%]' : 'left-8'} `}
        onClick={toggleMenu}>
        {!open
          ?<BiFilter className='w-8 h-8' />
          :<BiX className='w-8 h-8' />
        }
      </button>
        <div className={`lg:mr-10 lg:w-80 lg:min-h-full lg:scroll-m-1 lg:flex top-0 bg-white lg:z-auto drop-shadow-xl w-full ${open ? 'fixed top-0 left-0 w-full min-h-screen z-50' : 'hidden'}`}>
        <div className='lg:flex lg:flex-col lg:pt-0 pt-6'>
          {
            // Maps over the recipeParams object to create a Filter component for each filter category
            Object.keys(recipeParams).map((key) => (
              <Filter key={key} filterName={key} filterItems={recipeParams[key]} />
            ))
          }
          <div className='flex lg:justify-center lg:ml-0 justify-start ml-6'>
            <button className='text-font text-white bg-primary hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-secondary font-medium rounded-lg px-3 py-2 mb-6 mt-4' onClick={handleReset} >Clear filters</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Filters