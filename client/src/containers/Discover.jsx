import React, { useState, useCallback, useEffect } from 'react'
import { getRecommendedRecipes, getNextRecipes } from '../apis/recipeAPI'
import { Result } from '../components'
import { BiArrowToTop } from 'react-icons/bi'

const Discover = () => {
  const [results, setResults] = useState([])
  const [toTopVisible, setToTopVisible] = useState(false)

  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
      setToTopVisible(true)
    } else {
      setToTopVisible(false)
    }
  })

  const loadRecipes = useCallback(async () => {
    const { data } = await getRecommendedRecipes()
    setResults(data)
  }, [setResults])

  useEffect(() => {
    loadRecipes()
  }, [loadRecipes])

  const handleGetNext = async () => {
    const { data } = await getNextRecipes(results._links.next.href)
    data.hits = [...results.hits, ...data.hits]
    setResults({ ...results, to: data.to, count: data.count, _links: data._links, hits: data.hits })
  }

  return (
    <div className='min-h-[calc(100vh-7rem)]'>
      <div className='flex flex-col w-full justify-center align-middle px-10 pt-10'>
        {results.hits &&
          results.hits.map((result, index) => (
            <Result key={result._links.self.href} result={result} index={index} />
          ))}
        {
          results.hits && results.hits.length > 0 && results.to < results.count &&
          <button className='text-font text-white bg-primary hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-secondary font-medium rounded-lg px-3 py-2.5 mb-12' onClick={handleGetNext} type='button' >
            Load more
          </button>
        }
      </div>
      {
        toTopVisible &&
        <button className='fixed bottom-8 right-8 bg-primary rounded-full p-1.5 text-white'
          onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          aria-describedby='Return to the top of the page' >
          <BiArrowToTop className='w-8 h-8' />
        </button>
      }
    </div>
  )
}

export default Discover