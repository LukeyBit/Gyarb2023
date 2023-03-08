import React from 'react'
import Filter from './Filter'
import { params } from '../apis/recipeAPI'

const Filters = () => {
  const recipeParams = params.recipeParams

  const handleReset = () => {
    sessionStorage.removeItem('filters')
    window.location.reload()
  }

  return (
    <div className='mr-10 w-80 min-h-full scroll-m-1 top-0 bg-white drop-shadow-xl' >
      <div className='flex flex-col'>
        {
          Object.keys(recipeParams).map((key) => (
            <Filter key={key} filterName={key} filterItems={recipeParams[key]} />
          ))
        }
      </div>
      <div className='flex justify-center'>
        <button className='text-font text-white bg-primary hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-secondary font-medium rounded-lg px-3 py-2 mb-6 mt-4' onClick={handleReset} >Clear filters</button>
      </div>
    </div>
  )
}

export default Filters