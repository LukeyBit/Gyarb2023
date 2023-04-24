import React, { useState } from 'react'
import { BiRightArrow } from 'react-icons/bi'
import { useLocation } from 'react-router-dom'

const Recipe = () => {
  // Set dropdown state to false
  const [dropdown, setDropdown] = useState(false)
  // Get the recipe object from the location state, passed from the Result component
  const location = useLocation()
  const recipe = location.state.recipe

  // Toggle the dropdown state when the user clicks the dropdown button
  const toggleDropdown = () => {
    setDropdown(!dropdown)
  }

  // Render the recipe page with all the recipe information from the API response
  // The dropdown state is used to show or hide the dropdown menu
  // Which contains a table with the nutrition information on a detailed level
  return (
    <div className='p-8 md:px-20 lg:pl-32 min-h-[calc(100vh-8.5rem)]'>
      <h1 className='md:text-6xl text-5xl title-font md:mt-6 mb-2'>{recipe.label}</h1>
      <h2 className='text-xl text-font mb-6'>{recipe.yield} servings</h2>
      <div className='flex flex-col justify-between mb-6 md:flex-row'>
        <section className='flex flex-col md:w-1/2'>
          <img className='rounded-xl  aspect-square w-72 mb-6' src={recipe.images.REGULAR.url} alt={recipe.label} />
          <div className='mb-10'>
            <h2 className='text-xl text-font mb-2'>Ingredients:</h2>
            <ul className='subtitle-font '>
              {recipe.ingredientLines.map((ingredient) => (
                <li className='list-disc' key={ingredient}>{ingredient}</li>
              ))}
            </ul>
          </div>
          <div className='flex flex-col justify-center align-middle text-font lg:w-1/2 mb-10'>
            <a href={recipe.url} target='_blank' rel='noreferrer noopener' className='text-white bg-primary hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-secondary font-medium rounded-lg mx-auto px-3 py-2.5 h-fit w-fit'>Read the instructions</a>
            <p className='text-center w-fit mx-auto'>on {recipe.source}</p>
          </div>
        </section>
        <section className='flex flex-col w-1/3 gap-6'>
          <div>
            <h2 className='text-xl text-font mb-2'>Nutrition:</h2>
            <p className='subtitle-font'>Calories: {parseInt(recipe.calories)} kcal</p>
            <p className='subtitle-font'>Carbs: {parseInt(recipe.totalNutrients.CHOCDF.quantity)} {recipe.totalNutrients.CHOCDF.unit}</p>
            <p className='subtitle-font'>Fat: {parseInt(recipe.totalNutrients.FAT.quantity)} {recipe.totalNutrients.FAT.unit}</p>
            <p className='subtitle-font'>Protein: {parseInt(recipe.totalNutrients.PROCNT.quantity)} {recipe.totalNutrients.PROCNT.unit}</p>
          </div>
          <div>
            <h2 className='text-xl text-font mb-2'>Diets:</h2>
            <ul className='subtitle-font'>
              {recipe.dietLabels.map((label) => (
                <li className='list-disc' key={label}>{label}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className='text-xl text-font mb-2'>Cautions:</h2>
            <ul className='subtitle-font'>
              {recipe.cautions.map((caution) => (
                <li className='list-disc' key={caution}>{caution}</li>
              ))}
            </ul>
          </div>
          <div className='w-48'>
            <h2 className='text-xl text-font'>Health Tags:</h2>
            <p className='subtitle-font'>
              {recipe.healthLabels.map((label, index) => (
                <span key={label}>{label}{index + 1 < recipe.healthLabels.length && ', '}</span>
              ))}
            </p>
          </div>
        </section>
      </div>
      <section>
        <div className='flex flex-col justify-center items-center mb-10'>
          <button className='text-xl text-font hover:text-primary hover:cursor-pointer flex flex-row items-center' onClick={toggleDropdown} >More nutritional facts <BiRightArrow className={`ml-1 transition-all ${dropdown && 'rotate-90'}`} size={18} /> </button>
        </div>
        {dropdown && (
          <div className='flex flex-col items-start mb-10'>
            <table className='md:table-fixed table-auto'>
              <thead className='uppercase'>
                <tr className='border-b border-gray-500'>
                  <th className='pr-3 border-r border-gray-500'>Nutrient</th>
                  <th className='pl-3'>Quantity per serving</th>
                </tr>
              </thead>
              <tbody>
                {
                  Object.keys(recipe.totalNutrients).map((key) => (
                    <tr key={key} className='border-b border-gray-300 h-8' >
                      <td className='pr-3 border-r border-gray-500'>{recipe.totalNutrients[key].label}</td>
                      <td className='pl-3'>{parseInt(recipe.totalNutrients[key].quantity) / recipe.yield} {recipe.totalNutrients[key].unit}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  )
}

export default Recipe