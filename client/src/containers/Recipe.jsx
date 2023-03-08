import React, { useState } from 'react'
import { BiRightArrow } from 'react-icons/bi'
import { useLocation } from 'react-router-dom'

const Recipe = () => {
  const [dropdown, setDropdown] = useState(false)
  const location = useLocation()
  const recipe = location.state.recipe

  const toggleDropdown = () => {
    setDropdown(!dropdown)
  }

  return (
    <div className='p-8 pt-0 min-h-[calc(100vh-8.5rem)]'>
      <h1 className='md:text-6xl text-5xl title-font mt-6 mb-2'>{recipe.label}</h1>
      <h2 className='text-xl text-font mb-6'>{recipe.yield} servings</h2>
      <div className='flex lg:flex-row flex-col justify-between gap-6 mb-6'>
        <div>
          <h2 className='text-xl text-font'>Ingredients:</h2>
          <ul className='pl-4 pt-2 subtitle-font '>
            {recipe.ingredientLines.map((ingredient) => (
              <li key={ingredient}>{ingredient}</li>
            ))}
          </ul>
        </div>
        <img className='rounded-xl -order-1 lg:order-2 lg:object-cover lg:max-h-80 lg:w-1/3 lg:h-full max-h-60 object-cover lg:mr-[10vw]' src={recipe.images.REGULAR.url} alt={recipe.label} />
      </div>
      <div className='flex flex-row justify-between mb-6'>
        <div className='flex flex-row gap-10'>
          <div>
            <h2 className='text-xl text-font'>Nutrition:</h2>
            <p className='pl-4 subtitle-font'>Calories: {parseInt(recipe.calories)} kcal</p>
            <p className='pl-4 subtitle-font'>Carbs: {parseInt(recipe.totalNutrients.CHOCDF.quantity)} {recipe.totalNutrients.CHOCDF.unit}</p>
            <p className='pl-4 subtitle-font'>Fat: {parseInt(recipe.totalNutrients.FAT.quantity)} {recipe.totalNutrients.FAT.unit}</p>
            <p className='pl-4 subtitle-font'>Protein: {parseInt(recipe.totalNutrients.PROCNT.quantity)} {recipe.totalNutrients.PROCNT.unit}</p>
          </div>
          <div>
            <h2 className='text-xl text-font'>Diets:</h2>
            <p className='pl-4 subtitle-font'>
              {recipe.dietLabels.map((label, index) => (
                <span key={label}>{label}{index + 1 < recipe.dietLabels.length && ', '}</span>
              ))}
            </p>
          </div>
          <div>
            <h2 className='text-xl text-font'>Cautions:</h2>
            <p className='pl-4 subtitle-font'>
              {recipe.cautions.map((caution, index) => (
                <span key={caution}>{caution}{index + 1 < recipe.cautions.length && ', '}</span>
              ))}
            </p>
          </div>
        </div>
      </div>
      <div className='lg:flex flex-row justify-between'>
        <div className='mb-6 lg:w-1/2 md:w-3/4 w-full'>
          <h2 className='text-xl text-font'>Health Tags:</h2>
          <p className='pl-4 subtitle-font'>
            {recipe.healthLabels.map((label, index) => (
              <span key={label}>{label}{index + 1 < recipe.healthLabels.length && ', '}</span>
            ))}
          </p>
        </div>
        <div className='flex flex-col justify-center align-middle text-font lg:w-1/2'>
          <a href={recipe.url} target='_blank' rel='noreferrer noopener' className='text-white bg-primary hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-secondary font-medium rounded-lg mx-auto px-3 py-2.5 h-fit w-fit'>Read the instructions</a>
          <p className='text-center w-fit mx-auto'>on {recipe.source}</p>
        </div>
      </div>
      <div>
        <button className='text-xl text-font hover:text-primary hover:cursor-pointer flex flex-row items-center' onClick={toggleDropdown} >More nutritional facts <BiRightArrow className={`transition-all ${dropdown && 'rotate-90'}`} size={18} /> </button>
        {dropdown && (
          <div className='flex mt-6 mb-10'>
            <table className='table-fixed'>
              <thead className='uppercase'>
                <tr className='border-b border-gray-500'>
                  <th>Nutrient</th>
                  <th>Quantity per serving</th>
                </tr>
              </thead>
              <tbody>
            {
              Object.keys(recipe.totalNutrients).map((key) => (
                <tr key={key} className='border-b border-gray-300' >
                  <td>{recipe.totalNutrients[key].label}</td>
                  <td>{parseInt(recipe.totalNutrients[key].quantity)/recipe.yield} {recipe.totalNutrients[key].unit}</td>
                </tr>
              ))}
              </tbody>
              </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default Recipe