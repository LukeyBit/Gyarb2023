import React, { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Filters } from '../components'
import { getRecipes, getNextRecipes } from '../apis/recipeAPI'

const Search = () => {
  const navigate = useNavigate()
  const noResultsMessage = useRef('Search for recipes by keywords and/or filters')
  const [query, setQuery] = useState('')
  const [results, setResults] = useState({})
  const [toTopVisible, setToTopVisible] = useState(false)
  const dispatch = useDispatch()

  const handleSearchChange = (e) => {
    setQuery(e.target.value)
  }

  const handleSearchSubmit = async (e) => {
    e.preventDefault()
    noResultsMessage.current = 'No results found'
    let filters = JSON.parse(sessionStorage.getItem('filters')) || {}
    if (query !== '' || filters !== {}) {
      const { data } = await getRecipes(query)
      setResults(data)
    } else {
      dispatch({ type: 'ERROR', payload: { success: false, message: 'Please fill in a search phrase or select a filter' } })
    }
  }

  const handleGetNext = async () => {
    const { data } = await getNextRecipes(results._links.next.href)
    data.hits = [...results.hits, ...data.hits]
    setResults({ ...results, to: data.to, count: data.count, _links: data._links, hits: data.hits })
  }

  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
      setToTopVisible(true)
    } else {
      setToTopVisible(false)
    }
  })

  const handleRecipeClick = (e) => {
    e.preventDefault()
    navigate(`/recipe/${e.target.id}` , { state: { recipe: results.hits[e.target.id].recipe }})
  }

  return (
    <div className='flex flex-row justify-between min-h-[calc(100vh-7rem)]'>
      <Filters />
      <div className='flex flex-col w-full pr-10'>
        <form className='flex flex-row mt-8 w-full justify-center align-middle mb-8' onSubmit={handleSearchSubmit} >
          <div className='flex flex-row w-full justify-center align-top'>
            <input type='text' id='search' className='subtitle-font justify-center align-middle bg-gray-50 border-gray-300 border text-text-color-primary sm:text-sm rounded-lg focus:ring-primary focus:outline-none focus:border-primary focus:border block w-3/4 p-2.5 mr-4' placeholder='Keywords separated by comma' onChange={handleSearchChange} />
            <label htmlFor='search' className='sr-only'>Search</label>
            <button type='submit' className='text-font text-white bg-primary hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-secondary font-medium rounded-lg px-3 py-2.5' onClick={handleSearchSubmit} >
              <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'></path></svg>
              <span className='sr-only'>Search</span>
            </button>
          </div>
        </form>
        <div className='flex flex-col justify-center align-middle' >
          {
            results.hits && results.hits.length > 0
              ? results.hits.map((result, index) => (
                <div key={result._links.self.href} className='flex md:flex-row flex-col mb-6 border-2 border-gray-200'>
                  <img src={result.recipe.images.SMALL.url} alt={result.recipe.label} className='md:object-scale-down h-40 object-cover' />
                  <div className='text-sm text-font flex flex-col justify-between mt-2 ml-2 md:mt-0 w-1/2' >
                    <div>
                      <h1 className='title-font text-2xl' >{result.recipe.label}</h1>
                      <p className='text-sm' >Servings: {result.recipe.yield}</p>
                      <p className='text-sm' >Ingredients: {result.recipe.ingredients.length}</p>
                      <p className='text-sm' >Calories: {parseInt(result.recipe.calories)} kcal</p>
                      <p className='mr-1'>Type: {result.recipe.dishType ? result.recipe.dishType[0].charAt(0).toUpperCase() + result.recipe.dishType[0].slice(1) : 'Undefined'}</p>
                    </div>
                    <div className='mb-2' >
                      <p className='text-sm' >Source: {result.recipe.source}</p>
                    </div>
                  </div>
                  <div className='flex flex-row w-1/4 justify-end items-center'>
                    <Link to={`/recipe/${index}`} className='text-font text-sm text-white bg-primary hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-secondary font-medium rounded-lg px-3 py-2.5 w-fit h-fit mr-2' onClick={handleRecipeClick} id={index}>View recipe</Link>
                  </div>
                </div>
              ))
              : <div className='text-font text-2xl text-center' >{noResultsMessage.current}</div>
          }
          {
            results.hits && results.hits.length > 0 && results.to < results.count &&
            <button className='text-font text-white bg-primary hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-secondary font-medium rounded-lg px-3 py-2.5 mb-12' onClick={handleGetNext} type='button' >
              Load more
            </button>
          }
        </div>
      </div>
      {
        toTopVisible &&
        <button className='fixed bottom-8 right-8 bg-primary rounded-full p-1.5 text-white'
          onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          aria-describedby='Return to the top of the page' >
          <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M5 10l7-7m0 0l7 7m-7-7v18'></path></svg>
        </button>
      }
    </div>
  )
}

export default Search