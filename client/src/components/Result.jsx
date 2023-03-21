import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const Result = ({ result, index }) => {
    const navigate = useNavigate()
    const [loaded, setLoaded] = useState(false)

    const handleRecipeClick = (e) => {
        e.preventDefault()
        navigate(`/recipe/${e.target.id}`, { state: { recipe: result.recipe } })
    }

    const imageLoaded = () => {
        setLoaded(true)
    }

    return (
        <div key={result._links.self.href} className='flex md:flex-row flex-col mb-6 border-2 border-gray-200'>
            <div className='flex flex-row justify-center align-middle h-48'>
                <img src={result.recipe.images.SMALL.url} alt={result.recipe.label} className={`md:object-scale-down h-full object-cover w-full ${!loaded && 'hidden'}`} onLoad={imageLoaded} />
                {!loaded &&
                    <div className='flex flex-row justify-center items-center w-48'>
                        <svg aria-hidden="true" className="w-10 h-10 text-gray-200 animate-spin fill-primary" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                    </div>
                }
            </div>
            <div className='text-sm text-font flex flex-col justify-between mt-2 ml-2 md:mt-0 w-1/2' >
                <div>
                    <h1 className='title-font text-2xl' >{result.recipe.label}</h1>
                    <p className='text-sm' >Servings: {result.recipe.yield}</p>
                    <p className='text-sm' >Ingredients: {result.recipe.ingredients.length}</p>
                    <p className='text-sm' >Calories: {parseInt(result.recipe.calories)} kcal</p>
                    <p className='mr-1'>Type: {result.recipe.dishType ? result.recipe.dishType[0].charAt(0).toUpperCase() + result.recipe.dishType[0].slice(1) : 'Undefined'}</p>
                </div>
                <div className='mb-2' >
                    <p className='text-sm' >Source: {result.recipe.source}</p>
                </div>
            </div>
            <div className='flex flex-row md:w-1/4 md:justify-end items-center w-full justify-center md:my-0 my-4'>
                <Link to={`/recipe/${index}`} className='text-font text-sm text-white bg-primary hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-secondary font-medium rounded-lg px-3 py-2.5 w-fit h-fit mr-2' onClick={handleRecipeClick} id={index}>View recipe</Link>
            </div>
        </div>
    )
}

export default Result