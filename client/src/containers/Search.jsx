import React, { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { Filters, Result } from '../components'
import { getRecipes, getNextRecipes } from '../apis/recipeAPI'
import { BiUpArrow } from 'react-icons/bi'

const Search = () => {
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

  return (
    <div className='flex flex-row justify-between min-h-[calc(100vh-7rem)]'>
      <Filters />
      <div className='flex flex-col w-full lg:pr-10'>
        <form className='flex flex-row mt-8 w-full justify-center align-middle mb-8' onSubmit={handleSearchSubmit} >
          <div className='flex flex-row w-full justify-center align-top md:text-base text-sm'>
            <input type='text' id='search' className='subtitle-font justify-center align-middle bg-gray-50 border-gray-300 border text-text-color-primary sm:text-sm rounded-lg focus:ring-primary focus:outline-none focus:border-primary focus:border block w-3/4 p-2.5 mr-4' placeholder='Keywords separated by comma' onChange={handleSearchChange} />
            <label htmlFor='search' className='sr-only'>Search</label>
            <button type='submit' className='text-font text-white bg-primary hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-secondary font-medium rounded-lg px-3 py-2.5' onClick={handleSearchSubmit} >
              <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'></path></svg>
              <span className='sr-only'>Search</span>
            </button>
          </div>
        </form>
        <div className='flex flex-col justify-center align-middle px-10' >
          {
            results.hits && results.hits.length > 0
              ? results.hits.map((result, index) => (
                <Result key={result._links.self.href} result={result} index={index} />
              ))
              : <div className='text-font md:text-2xl text-xl text-center md:px-0 px-4' >{noResultsMessage.current}</div>
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
          <BiUpArrow className='w-8 h-8' />
        </button>
      }
    </div>
  )
}

export default Search