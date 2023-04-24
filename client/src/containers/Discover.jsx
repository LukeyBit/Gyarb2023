import React, { useState, useCallback, useEffect } from 'react'
import secureLocalStorage from 'react-secure-storage'
import { getRandomRecipes } from '../apis/recipeAPI'
import { getRecommendedRecipes } from '../apis/recipeAPI'
import { Result } from '../components'
import { params } from '../apis/recipeAPI'
import { BiUpArrow } from 'react-icons/bi'

/**
 * 
 * @returns {JSX.Element} Discover container
 * 
 * @description This container renders the discover page where the user can see recommended recipes
 */
const Discover = () => {
  // Results state is an array of recipe objects from the API
  const [results, setResults] = useState([])
  // Set toTopVisible state to false
  const [toTopVisible, setToTopVisible] = useState(false)

  // Set toTopVisible state to true when the user scrolls down more than 350px
  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
      setToTopVisible(true)
    } else {
      setToTopVisible(false)
    }
  })

  // Load recipes from the API based on the user's preferences and rating
  const loadRecipes = useCallback(async () => {
    const { data } = await getRecommendedRecipes()
    setResults(data)
  }, [setResults])

  // Load random recipes from the API if the user has not set any preferences or rating
  const randomRecipes = useCallback(async () => {
      const { data } = await getRandomRecipes(`&health=${params.recipeParams.health[Math.random() * params.recipeParams.health.length | 0]}`)
      setResults(data)
    }, [setResults])

  // Load recipes when the component mounts
  useEffect(() =>{
    let user = secureLocalStorage.getItem('user') || {}
    if (user.rating || user.preferences) {
      loadRecipes()
    } else {
      randomRecipes()
    }
  }, [loadRecipes, randomRecipes])

  // Load more recipes when the user clicks the load more button
  const handleGetNext = async () => {
    const { data } = await getRecommendedRecipes()
    data.hits = [...results.hits, ...data.hits]
    setResults({ ...results, to: data.to, count: data.count, _links: data._links, hits: data.hits })
  }

  return (
    <div className='min-h-[calc(100vh-7rem)]'>
      <div className='flex flex-col w-full justify-center align-middle px-10 pt-10'>
        {// If there are results, map over the results and render a Result component for each result
        results.hits &&
          results.hits.map((result, index) => (
            <Result key={result._links.self.href} result={result} index={index} />
          ))}
        {// If there are results and the number of results is less than the total number of available results, render a load more button
          results.hits && results.hits.length > 0 && results.to < results.count &&
          <button className='text-font text-white bg-primary hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-secondary font-medium rounded-lg px-3 py-2.5 mb-12' onClick={handleGetNext} type='button' >
            Load more
          </button>
        }
      </div>
      {// If the user has scrolled down more than 350px, render a button that scrolls the user to the top of the page
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

export default Discover