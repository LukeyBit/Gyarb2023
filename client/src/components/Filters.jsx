import React from 'react'
import Filter from './Filter'
import { params } from '../apis/recipeAPI'

const Filters = () => {
  const recipeParams = params.recipeParams

  return (
    <div className='mr-10 w-80 min-h-full scroll-m-1 top-0 bg-white drop-shadow-xl' >
      <div className='flex flex-col justify-center'>
        {Object.keys(recipeParams).map((key) => (
          <Filter key={key} filterName={key} filterItems={recipeParams[key]} />
        ))}
      </div>
    </div>
  )
}

export default Filters