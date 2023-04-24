import React, { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { Filters, Result } from '../components'
import { getRecipes, getNextRecipes } from '../apis/recipeAPI'
import { BiUpArrow, BiSearch } from 'react-icons/bi'

const Search = () => {
  // noResultsMessage is a ref that holds the message to display when there are no results
  const noResultsMessage = useRef('Search for recipes by keywords and/or filters')
  // query state is the search query
  const [query, setQuery] = useState('')
  // results state is an object containing the result information with recipe objects from the API
  const [results, setResults] = useState({})
  // toTopVisible state is a boolean that determines whether the scroll to top button is visible
  const [toTopVisible, setToTopVisible] = useState(false)
  // dispatch is a function that dispatches an action to the store
  const dispatch = useDispatch()

  // Handle search input change
  const handleSearchChange = (e) => {
    setQuery(e.target.value)
  }

  // Handle search submit
  const handleSearchSubmit = async (e) => {
    e.preventDefault()
    // Set the noResultsMessage ref to a new message when the first search is submitted
    noResultsMessage.current = 'No results found'
    // Get the filters from sessionStorage
    let filters = JSON.parse(sessionStorage.getItem('filters')) || {}
    // If the query or filters are not empty, get the recipes from the API
    if (query !== '' || filters !== {}) {
      const { data } = await getRecipes(query)
      setResults(data)
    } else {
      // If the query and filters are empty, dispatch an error action to the store to display an error message
      dispatch({ type: 'ERROR', payload: { success: false, message: 'Please fill in a search phrase or select a filter' } })
    }
  }

  // Handle load more button click
  const handleGetNext = async () => {
    const { data } = await getNextRecipes(results._links.next.href)
    data.hits = [...results.hits, ...data.hits]
    setResults({ ...results, to: data.to, count: data.count, _links: data._links, hits: data.hits })
  }

  // Set toTopVisible state to true when the user scrolls down more than 350px
  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
      setToTopVisible(true)
    } else {
      setToTopVisible(false)
    }
  })

  return (
    <div className='flex flex-row justify-between min-h-[calc(100vh-7rem)]'>
      <Filters />
      <div className='flex flex-col w-full lg:pr-10'>
        <form className='flex flex-row mt-8 w-full justify-center align-middle mb-8' onSubmit={handleSearchSubmit} >
          <div className='flex flex-row w-full justify-center align-top md:text-base text-sm'>
            <input type='text' id='search' className='subtitle-font justify-center align-middle bg-gray-50 border-gray-300 border text-text-color-primary sm:text-sm rounded-lg focus:ring-primary focus:outline-none focus:border-primary focus:border block w-3/4 p-2.5 mr-4' placeholder='Search by ingredients or keywords' onChange={handleSearchChange} />
            <label htmlFor='search' className='sr-only'>Search</label>
            <button type='submit' className='text-font text-white bg-primary hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-secondary font-medium rounded-lg px-3 py-2.5' onClick={handleSearchSubmit} >
              <BiSearch className='w-5 h-5' />
              <span className='sr-only'>Search</span>
            </button>
          </div>
        </form>
        <div className='flex flex-col justify-center align-middle px-10' >
          { // If there are results, map over the results and display them, otherwise display the noResultsMessage
            results.hits && results.hits.length > 0
              ? results.hits.map((result, index) => (
                <Result key={result._links.self.href} result={result} index={index} />
              ))
              : <div className='text-font md:text-2xl text-xl text-center md:px-0 px-4' >{noResultsMessage.current}</div>
          }
          { // If there are results and the number of results is less than the total number of available results, display the load more button
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
          <BiUpArrow className='w-8 h-8' />
        </button>
      }
    </div>
  )
}

export default Search