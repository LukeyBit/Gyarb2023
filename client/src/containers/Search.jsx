import React, { useState } from 'react'
import { Filters } from '../components'
import { getRecipes } from '../apis/recipeAPI'

const Search = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])

  const handleSearchChange = (e) => {
    setQuery(e.target.value)
  }

  const handleSearchSubmit = async (e) => {
    e.preventDefault()
    let filters = JSON.parse(sessionStorage.getItem('filters')) || {}
    if (query !== '' || filters !== {}) {
      const { data } = await getRecipes(query)
      setResults(data.hits)
      console.log(data)
    }
  }

  //TODO Add filter functionality
  //TODO Add "back to top" button when scrolling down
  //TODO Add "load more" button when scrolling down
  //TODO Add keyword handling
  //TODO Add links to recipes
  //TODO Change image to thumbnail

  return (
    <div className='flex flex-row justify-between min-h-[calc(100vh-7rem)]'>
      <Filters />
      <div className='flex flex-col w-full'>
        <form className='flex items-start mx-4 mt-8 mr-auto w-5/6' onSubmit={handleSearchSubmit} >
          <label htmlFor='search' className='sr-only'>Search</label>
          <input type='text' id='search' className='subtitle-font justify-center align-middle bg-gray-50 border-gray-300 border text-text-color-primary sm:text-sm rounded-lg focus:ring-primary focus:outline-none focus:border-primary focus:border block w-full p-2.5 mr-4 mb-6' placeholder='Keywords separated by comma' onChange={handleSearchChange} />
          <button type='submit' className='text-font text-white bg-primary hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-secondary font-medium rounded-lg px-3 py-2.5' onClick={handleSearchSubmit} >
            <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'></path></svg>
            <span className='sr-only'>Search</span>
          </button>
        </form>
        <div className='mr-8' >
          {results.length > 0
            ? results.map((result) => (
              <div key={result.recipe.uri} className='flex md:flex-row flex-col mb-6 border-2 border-gray-200' >
                <img src={result.recipe.images.REGULAR.url} alt={result.recipe.label} className='md:object-scale-down h-40 object-cover' />
                <div className='text-sm text-font flex flex-col justify-between mt-2 ml-2 md:mt-0' >
                  <div>
                    <h1 className='title-font text-2xl' >{result.recipe.label}</h1>
                    <p className='text-sm' >Calories: {parseInt(result.recipe.calories)} kcal</p>
                    <p className='mr-1'>Type: {result.recipe.dishType[0].charAt(0).toUpperCase() + result.recipe.dishType[0].slice(1)}</p>
                  </div>
                  <p className='text-sm mb-2' >Source: {result.recipe.source}</p>
                </div>
              </div>
            ))
            : <div className='flex flex-row text-font text-2xl' >No results</div>}
        </div>
      </div>
    </div>
  )
}

export default Search