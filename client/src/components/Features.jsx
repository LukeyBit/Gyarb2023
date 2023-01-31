import React from 'react'
import searchImg from '../assets/search-img.jpg'
import discoverImg from '../assets/discover-img.jpg'
import recipeImg from '../assets/recipe-img.jpg'

const Features = () => (
  <div>
    <div className='text-center mx-auto w-[50vw] my-16 mb-8 lg:mb-16'>
      <h2 className='mb-4 text-4xl tracking-tight font-extrabold text-gray-900'>From home cook to professional chef</h2>
      <p className='text-gray-500 sm:text-xl'>Here at MealMaster we focus on technology, innovation, and minimizing food waste for long-term environmental growth.</p>
    </div>
    <div className='space-y-8'>
      <div className='flex flex-col-reverse md:flex-row'>
        <div className='text-center mx-3 mt-10'>
          <h3 className='mb-2 text-2xl font-bold'>Search</h3>
          <hr className='mx-auto h-px w-[30vw] my-1 bg-gray-300 border-0'/>
          <p className='text-gray-500 sm:text-xl text-left'>Our search bar makes it easy for you to find the perfect recipe for you. Just type in what you're looking for, and our search engine will show you all the related recipes. You can filter by category, price and time, to find exactly what you want. No more browsing through countless pages, with our search function you'll find what you need in no time.</p>
        </div>
        <img src={searchImg} alt="search-img" className='rounded md:w-[50vw]'/>
      </div>
      <div className='flex flex-col md:flex-row'>
        <img src={discoverImg} alt="discover-img" className='rounded md:w-[48vw]'/>
        <div className='text-center mx-3 mt-10'>
          <h3 className='mb-2 text-2xl font-bold'>Discover</h3>
          <hr className='mx-auto h-px w-[30vw] my-1 bg-gray-300 border-0'/>
          <p className='text-gray-500 sm:text-xl text-left'>Discover delicious new recipes and cooking inspiration with our Discover feature. Browse a selection of recipes curated just for you, based on your dietary preferences, ingredients on hand, and favorite cuisines. You can also explore new and trending recipes, as well as seasonal recipes. With our Discover feature, you'll never run out of meal ideas and you'll be able to expand your culinary skills
        </p>
        </div>
      </div>
      <div className='flex flex-col-reverse md:flex-row'>
        <div className='text-center mx-2'>
        <h3 className='mb-3 mt-10 text-2xl font-bold'>More than 2 million recipes</h3>
        <hr className='mx-auto h-px w-[30vw] my-1 bg-gray-300 border-0'/>
        <p className='text-gray-500 sm:text-xl text-left'>We have over 2 million recipes for you to choose from. Whether you're looking for a quick and easy meal, or a more complex dish, we have you covered. We have recipes for every occasion, from breakfast to dinner, and even dessert. We also have recipes for every dietary preference, including vegan, vegetarian, gluten-free, and dairy-free. With so many recipes to choose from, you'll never run out of meal ideas.</p>
        </div>
        <img src={recipeImg} alt="recipe-img" className='rounded md:w-[50vw]'/>
      </div>
    </div>
    <hr className='mx-auto w-[90vw] h-px my-16 bg-gray-300 border-0'/>
  </div>
)

export default Features