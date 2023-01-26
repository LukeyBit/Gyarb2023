import React from 'react'
import { Team, Features  } from '../components'

const Home = () => {
  return (
    <>
      <div className='home__header'>
        <div className='home__header-backdrop'>
          <div className='home__header-container'>
            <div className='home__header-text'>
              <h1 className='home__header-title'>MealMaster</h1>
              <p className='home__header-subtitle'>The best way to find your next meal</p>
            </div>
            <button className='home__header-btn'>
              <span>Get started</span>
            </button>
          </div>
        </div>
      </div>
      <Features />
      <Team />
    </>
  )
}

export default Home