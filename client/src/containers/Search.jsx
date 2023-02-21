import React from 'react'
import { Filters } from '../components'

const Search = () => {
  return (
    <div className='mb-10'>
      <div className='flex flex-row justify-between' >
        <Filters />
        <form className='flex items-start mx-4 mt-8 mr-auto w-1/2'>
          <label htmlFor='search' className='sr-only'>Search</label>
          <input type='text' id='search' className='subtitle-font justify-center align-middle bg-gray-50 border-gray-300 border text-text-color-primary sm:text-sm rounded-lg focus:ring-primary focus:outline-none focus:border-primary focus:border block w-full p-2.5 mr-4' placeholder='Keywords separated by comma' />
          <button type='submit' className='text-font text-white bg-primary hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-secondary font-medium rounded-lg px-3 py-2.5'>
            <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'></path></svg>
            <span className='sr-only'>Search</span>
          </button>
        </form>
      </div>
    </div>
  )
}

export default Search