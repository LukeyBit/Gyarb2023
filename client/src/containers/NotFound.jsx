import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <section className='bg-white dark:bg-gray-900'>
      <div className='py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6'>
        <div className='mx-auto max-w-screen-sm text-center'>
          <h1 className='mb-4 text-7xl tracking-tight title-font lg:text-9xl text-primary-600 dark:text-primary-500'>404</h1>
          <p className='mb-4 text-3xl tracking-tight text-font text-gray-900 md:text-4xl dark:text-white'>Something's missing.</p>
          <p className='mb-6 text-lg subtitle-font text-gray-500 dark:text-gray-400'>Sorry, we can't find that page. You'll find lots to explore on the home page. </p>
          <Link to='/' className='text-font text-white bg-primary hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-fill-color font-medium rounded-lg text-sm px-5 py-2.5 text-center'>Back to Homepage</Link>
        </div>
      </div>
    </section>
  )
}

export default NotFound