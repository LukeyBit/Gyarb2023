import React, { useEffect, useState } from 'react'
import Filter from './Filter'
import { params } from '../apis/recipeAPI'
import { BiFilter, BiX } from 'react-icons/bi'
import { useWindowDimensions } from '../hooks'

const Filters = () => {
  const recipeParams = params.recipeParams
  const [open, setOpen] = useState(false)
  const { width } = useWindowDimensions()


  const handleReset = () => {
    sessionStorage.removeItem('filters')
    window.location.reload()
  }

  const toggleMenu = () => {
    setOpen(!open)
  }

  useEffect(() => {
    if (width > 1024) {
      setOpen(false)
    }
  }, [width])

  return (
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