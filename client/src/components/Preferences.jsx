import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { updateTags, updateRating } from '../store/actions/userActions'
import secureLocalStorage from 'react-secure-storage'
import { params, getRandomRecipes } from '../apis/recipeAPI'
import { BiSearch } from 'react-icons/bi'

const Preferences = () => {

    const tagsToObject = (str) => {
        let obj = {}
        params.recipeParams[str].forEach(tag => {
            tag = tag.toLowerCase()
            obj[tag] = 0
        })
        return obj
    }

    const labelList = ['healthLabels', 'dietLabels', 'cuisineType', 'dishType']
    const user = secureLocalStorage.getItem('user')
    let userTags = user.preferences || []
    const isMounted = useRef(false)
    const dispatch = useDispatch()

    const [preferenceTags, setPreferenceTags] = useState(params.recipeParams.health)

    const [userRating, setUserRating] = useState(user.rating || { healthLabels: tagsToObject('health'), dietLabels: tagsToObject('diet'), cuisineType: tagsToObject('cuisineType'), dishType: tagsToObject('dishType') })
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [recipes, setRecipes] = useState([])
    const [pictures, setPictures] = useState([])
    const [clickedTags, setClickedTags] = useState([])
    const [searchResult, setSearchResult] = useState([])

    const loadData = async () => {
        if (userTags.length === 0) {
            const { data } = await getRandomRecipes(`&health=${preferenceTags[Math.random() * preferenceTags.length | 0]}`)
            setRecipes(data.hits)
            getTwoRecipes(0, data.hits)
        } else {
            const { data } = await getRandomRecipes(`&health=${userTags.join('&health=')}`)
            setRecipes(data.hits)
            getTwoRecipes(0, data.hits)
        }
    }


    const getTwoRecipes = (index, data) => {
        if (index >= 20) {
            loadData()
        } else {
            const r1 = data[index]
            const r2 = data[index + 1]
            setPictures([
                { link: r1.recipe.image, name: r1.recipe.label, index: index },
                { link: r2.recipe.image, name: r2.recipe.label, index: index + 1 }
            ])
        }
    }


    useEffect(() => {
        if (!isMounted.current) {
            loadData()
            setClickedTags([...userTags])
            setPreferenceTags(preferenceTags.filter(tag => !userTags.includes(tag)))
            isMounted.current = true
        }// eslint-disable-next-line
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()

        dispatch(updateTags(clickedTags))
    }

    const handleSearch = (e) => {
        e.preventDefault()
        setSearch(e.target.value.toLowerCase())
        if (e.target.value === '' || e.target.value === null) {
            setSearchResult([])
        } else {
            setSearchResult(preferenceTags.filter(tag => tag.toLowerCase().includes(e.target.value.toLowerCase())))
        }
    }

    const handleCheck = (e) => {
        e.preventDefault()
        const checked = e.target.checked
        const name = e.target.name
        if (checked) {
            setClickedTags([...clickedTags, name])
            setPreferenceTags(preferenceTags.filter(tag => tag !== name))
            setSearchResult(searchResult.filter(tag => tag !== name))
        } else {
            setClickedTags(clickedTags.filter(tag => tag !== name))
            setPreferenceTags([...preferenceTags, name])
            if (search !== '' && name.toLowerCase().includes(search)) {
                setSearchResult([...searchResult, name])
            }
        }
        setSearch(document.getElementById('search').value)
    }


    const handleRating = (e) => {
        e.preventDefault()
        let rating = userRating
        labelList.forEach(key => {
            recipes[e.target.id].recipe[key].forEach(label => {
                label = label.replace(/ /g, '-')
                rating = { ...rating, [key]: { ...rating[key], [label.toLowerCase()]: rating[key][label.toLowerCase()] + 1 } }
            })
        })
        setLoading(true)
        dispatch(updateRating(rating))
        setUserRating(rating)
        getTwoRecipes(pictures[1].index + 1, recipes)
    }

    const imageLoaded = () => {
        setLoading(false)
    }

    return (
        <div className='w-full md:w-[65vw] pt-8 pb-24'>
            <div className='text-center mt-5'>
                <form className='ml-8 flex flex-col h-max shadow-lg rounded-xl' autoComplete='off' onSubmit={handleSubmit}>
                <h1 className='title-font text-2xl'>Your health tags</h1>
                    <div className='flex flex-col p-10'>
                        <div className='mt-2 ml-2 mb-6 py-auto'>
                            <div className='relative w-full'>
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <BiSearch className='w-5 h-5 text-gray-500' />
                                </div>
                                <input type="text" name="search" id="search" className="subtitle-font justify-center align-middle bg-gray-50 border-gray-300 border text-text-color-primary sm:text-sm rounded-lg focus:ring-primary focus:outline-none focus:border-primary focus:border block w-full p-2.5 pl-10" placeholder="Search for tags" onChange={handleSearch} />
                            </div>
                        </div>
                        <div id='showTags' className='flex overflow-y-auto w-full md:max-h-20'>
                        <div className='flex flex-wrap'>
                                {clickedTags.map((tag) => {
                                    return (
                                        <div className='flex justify-center flex-row w-max h-min text-white m-1 p-1 rounded bg-primary hover:border-primary hover:bg-secondary hover:animate-pulse' key={tag}>
                                            <input type="checkbox" checked={true} onChange={handleCheck} name={tag} id={tag} className='mt-2 mr-2 hidden peer text-font' />
                                            <label htmlFor={tag} className='text-sm font-semibold cursor-pointer'>{tag}</label>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div id='showTagSearch' className=' overflow-y-auto w-full md:max-h-20'>
                            <div className='flex flex-wrap overflow-y-auto'>
                                {(searchResult.length === 0 && search !== '') && <p className='text-sm m-2'>No tags found</p>}
                                {searchResult.map((tag) => {
                                    return (
                                        <div className='flex justify-center flex-row w-max h-min text-secondary m-1 p-1 rounded border border-secondary hover:border-primary hover:text-primary hover:animate-pulse' key={tag}>
                                            <input type="checkbox" onChange={handleCheck} name={tag} id={tag} className='mt-2 mr-2 hidden peer text-font' />
                                            <label htmlFor={tag} className='text-sm font-semibold cursor-pointer'>{tag}</label>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <button type='submit' className='rounded self-end p-1 mt-5 mr-5 mb-5 border border-secondary text-secondary hover:text-primary hover:border-primary hover:animate-pulse'>Save tags</button>
                </form>
            </div>
            <div className='flex flex-col items-center mt-5 ml-8 shadow-lg rounded-lg'>
                <h1 className='text-text-color-primary mt-2 text-2xl title-font'>Which is better?</h1>
                <p className='text-text-color-primary text-font'>Rate food to get recommendations based on your preferences</p>
                <div className='flex flex-row gap-12 mt-3'>
                    {pictures.map((pic) => {
                        return (
                            <div onClick={handleRating} className='w-44 h-fit md:w-60 text-center pb-5' key={pic.index}>
                                <img id={pic.index} className='rounded hover:border-4 hover:border-primary duration-100' src={pic.link} alt="food_pic" style={{ display: loading ? 'none' : 'block' }} onLoad={imageLoaded} />
                                <div style={{ display: loading ? 'block' : 'none' }} className='w-full h-full flex rounded bg-gray-100'>
                                    <svg aria-hidden="true" className="w-10 h-10 text-gray-200 animate-spin fill-primary" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                    </svg>
                                </div>
                                <p className='mt-2 text-font text-lg'>{pic.name}</p>
                            </div>
                        )
                    }
                    )}
                </div>
            </div>
        </div>
    )
}

export default Preferences