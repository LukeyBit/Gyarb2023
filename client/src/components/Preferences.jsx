import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { updateTags, updateRating } from '../store/actions/userActions'
import secureLocalStorage from 'react-secure-storage'
import { params, getRandomRecipes } from '../apis/recipeAPI'

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
        console.log(recipes[e.target.id].recipe)
        console.log(rating)
        labelList.forEach(key => {
            console.log(key)
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
        <div className='w-[65vw] pt-8 shadow-lg pb-24'>
            <div>
                <h1 className='ml-8 subtitle-font font-semibold text-xl'>Tags</h1>
                <form className='ml-8 flex flex-col h-max shadow-lg rounded-xl' autoComplete='off' onSubmit={handleSubmit}>
                    <div className='flex flex-row'>
                        <div className='w-1/2 flex flex-none flex-col'>
                            <div className='relative z-0 mt-2 ml-2 w-[25vw] h-12 mb-6 group flex flex-row py-auto'>
                                <input type="search" name="search" id="search" className="block py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-secondary appearance-none focus:outline-none focus:ring-0 focus:border-primary peer" placeholder=" " onChange={handleSearch} />
                                <label htmlFor="search" className="font-semibold peer-focus:font-medium absolute text-sm text-secondary duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Search for tags</label>
                            </div>
                            <div id='showTagSearch' className='grow-0'>
                                <div className='flex flex-wrap overflow-y-auto'>
                                    {(searchResult.length === 0 && search !== '') && <p className='text-sm m-2'>No tags found</p>}
                                    {searchResult.map((tag) => {
                                        return (
                                            <div className='flex justify-center flex-row w-max h-min text-secondary m-1 p-1 rounded border border-secondary hover:border-primary hover:text-primary hover:animate-pulse' key={tag}>
                                                <input type="checkbox" onChange={handleCheck} name={tag} id={tag} className='mt-2 mr-2 hidden peer' />
                                                <label htmlFor={tag} className='text-sm font-semibold cursor-pointer'>{tag}</label>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                        <div id='showTags' className='w-[35vw] h-36 shadow-md flex flex-col mb-1'>
                            <h3 className='pt-2 pl-2 h-min'>My tags</h3>
                            <div className='flex flex-wrap overflow-y-auto'>
                                {clickedTags.map((tag) => {
                                    return (
                                        <div className='flex justify-center flex-row w-max h-min text-secondary m-1 p-1 rounded border border-secondary hover:border-primary hover:text-primary hover:animate-pulse' key={tag}>
                                            <input type="checkbox" checked={true} onChange={handleCheck} name={tag} id={tag} className='mt-2 mr-2 hidden peer' />
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
            <div className='w-full flex flex-col items-center mt-5'>
                <h1 className='text-text-color-primary text-font my-3'>Which is better?</h1>
                <div className='flex flex-row gap-12'>
                    {pictures.map((pic) => {
                        return (
                            <div onClick={handleRating} className='h-60 w-60 text-center' key={pic.index}>
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