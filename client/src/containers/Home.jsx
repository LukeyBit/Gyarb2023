import React from 'react'
import { Team, Features  } from '../components'

const Home = () => {
  return (
    <>
      <div className='w-full flex justify-center items-center flex-col h-[calc(100vh-4.6rem)]  bg-cover bg-center bg-no-repeat home__header-background'>
        <div className='w-full h-full flex flex-col justify-center items-center backdrop-blur-sm bg-gray-400/20'>
          <div className='flex flex-col justify-center items-center bg-white p-6 rounded-md shadow-lg'>
            <div className='flex flex-col justify-center items-center'>
              <h1 className='title-font text-6xl font-bold text-center text-text-color-primary mb-4'>MealMaster</h1>
              <p className='text-xl text-font text-center text-text-color-secondary'>The best way to find your next meal</p>
            </div>
            <button className='text-font text-white bg-primary hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-fill-color font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-4 mb-6'>
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