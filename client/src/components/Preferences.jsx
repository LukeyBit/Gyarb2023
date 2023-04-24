import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { updateTags, updateRating } from '../store/actions/userActions'
import secureLocalStorage from 'react-secure-storage'
import { params, getRandomRecipes } from '../apis/recipeAPI'
import { BiSearch } from 'react-icons/bi'

/**
 * 
 * @returns {JSX.Element} Preferences component which allows the user to select their preferences
 * 
 * @description This component allows the user to select their preferences food preferences and update their rating for each preference
 * 
 */
const Preferences = () => {

    /**
     * 
     * @param {string} str 
     * @returns {object} object with keys as tags and values as 0
     * 
     * @description This function takes in a string which is a preference category and returns an object with it's possible values as tags and values as 0
     */
    const tagsToObject = (str) => {
        let obj = {}
        params.recipeParams[str].forEach(tag => {
            tag = tag.toLowerCase()
            obj[tag] = 0
        })
        return obj
    }
    // labelList is a list of all the preference categories
    const labelList = ['healthLabels', 'dietLabels', 'cuisineType', 'dishType']
    // user is the user data stored in secureLocalStorage
    const user = secureLocalStorage.getItem('user')
    // userTags is the list of tags the user has selected
    let userTags = user.preferences || []
    // isMounted is a boolean value which is used to check if the component is mounted with all the data necessary
    const isMounted = useRef(false)
    // dispatch is a function which is used to dispatch actions to the redux store
    const dispatch = useDispatch()

    // preferenceTags is a list of all the tags the user can select which are the recipeParams health tags
    const [preferenceTags, setPreferenceTags] = useState(params.recipeParams.health)
    // userRating is an object which stores the user's rating for each preference category
    const [userRating, setUserRating] = useState(user.rating || { healthLabels: tagsToObject('health'), dietLabels: tagsToObject('diet'), cuisineType: tagsToObject('cuisineType'), dishType: tagsToObject('dishType') })
    // loading is a boolean value which is used to check if the image is being loaded
    const [loading, setLoading] = useState(true)
    // search is a string which stores the user's search input for tags
    const [search, setSearch] = useState('')
    // recipes is a list of recipes fetched from the API
    const [recipes, setRecipes] = useState([])
    // pictures is a list of objects which stores the image link and name of the recipes and the index of the recipe in the recipes list
    const [pictures, setPictures] = useState([])
    // clickedTags is a list of tags the user has selected
    const [clickedTags, setClickedTags] = useState([])
    // searchResult is a list of tags which match the user's search input
    const [searchResult, setSearchResult] = useState([])

    /**
     *  returns {void} as it only loads data from the API and updates the state
     * 
     * @description This function loads data from the API and updates the state
     */
    const loadData = async () => {
        // if the user has not selected any tags, then the API is called with a random health tag
        if (userTags.length === 0) {
            const { data } = await getRandomRecipes(`&health=${preferenceTags[Math.random() * preferenceTags.length | 0]}`)
            setRecipes(data.hits) // data.hits is a list of recipes
            getTwoRecipes(0, data.hits) // getTwoRecipes is called to get two recipes from the list of recipes and display them
        } else {
            // if the user has selected tags, then the API is called with the user's tags
            const { data } = await getRandomRecipes(`&health=${userTags.join('&health=')}`)
            setRecipes(data.hits) // data.hits is a list of recipes
            getTwoRecipes(0, data.hits) // getTwoRecipes is called to get two recipes from the list of recipes and display them
        }
    }


    const getTwoRecipes = (index, data) => {
        // if the index is 20 or greater than 20, then the API is called again to get more recipes
        if (index >= 20) {
            loadData()
        } else {
            // if the index is less than 20, then two recipes are selected from the list of recipes and displayed
            const r1 = data[index]
            const r2 = data[index + 1]
            // updates pictures with the image link and name of the recipes and the index of two of the recipes in the recipes list
            setPictures([
                { link: r1.recipe.image, name: r1.recipe.label, index: index },
                { link: r2.recipe.image, name: r2.recipe.label, index: index + 1 }
            ])
        }
    }

    // useEffect is used to call loadData when the component is mounted as it is done on page load
    useEffect(() => {
        if (!isMounted.current) {
            // Loads data from the API and updates the state
            loadData()
            // Updates the clickedTags state with the user's selected tags
            setClickedTags([...userTags])
            // Updates the preferenceTags state with the tags the user has not selected
            setPreferenceTags(preferenceTags.filter(tag => !userTags.includes(tag)))
            // Updates the isMounted state to true
            isMounted.current = true
        }// eslint-disable-next-line
    }, [])

    /**
     * 
     * @param {Event} e 
     * 
     * @returns {void} as it only updates the state
     * 
     * @description This function is called when the user clicks on a tag and updates the selected tags in secureLocalStorage as well as in the server database
     * 
     */
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(updateTags(clickedTags))
    }

    /**
     * 
     * @param {Event} e 
     * 
     * @returns {void} as it only updates the state
     * 
     * @description This function is called when the user types in the search bar and updates the search state and searchResult state
     * 
     */
    const handleSearch = (e) => {
        e.preventDefault()
        // Sets the search state to the user's input
        setSearch(e.target.value.toLowerCase())
        // If the user's input is empty or null, then the searchResult state is set to an empty list
        if (e.target.value === '' || e.target.value === null) {
            setSearchResult([])
        } else {
            // If the user's input is not empty or null, then the searchResult state is set to a list of tags which match the user's input
            setSearchResult(preferenceTags.filter(tag => tag.toLowerCase().includes(e.target.value.toLowerCase())))
        }
    }

    /**
     * 
     * @param {Event} e
     * 
     * @returns {void} as it only updates the state
     * 
     * @description This function is called when the user clicks on a tag and updates the clickedTags state and preferenceTags state 
     */
    const handleCheck = (e) => {
        e.preventDefault()
        // Sets checked to true or false depending on whether the checkbox is checked or not
        const checked = e.target.checked
        // Sets name to the name of the checkbox
        const name = e.target.name
        // If the checkbox is now checked, then the clickedTags state is updated with the name of the checkbox and the preferenceTags state is updated without the name of the checkbox
        if (checked) {
            setClickedTags([...clickedTags, name])
            setPreferenceTags(preferenceTags.filter(tag => tag !== name))
            setSearchResult(searchResult.filter(tag => tag !== name))
        } else {
            // If the checkbox is now unchecked, then the clickedTags state is updated without the name of the checkbox and the preferenceTags state is updated with the name of the checkbox
            setClickedTags(clickedTags.filter(tag => tag !== name))
            setPreferenceTags([...preferenceTags, name])
            if (search !== '' && name.toLowerCase().includes(search)) {
                setSearchResult([...searchResult, name])
            }
        }
        // Sets the search state to the value of the search input to update the search result
        setSearch(document.getElementById('search').value)
    }

    /**
     * 
     * @param {Event} e 
     * 
     * @returns {void} as it only updates the state
     * 
     * @description This function is called when the user clicks on a recipe that they prefer and updates the userRating state and calls handleRating
     */
    const handleRating = (e) => {
        e.preventDefault()
        // Sets rating to the userRating state
        let rating = userRating
        // For each recipe category, if the recipe has the label, then the rating is increased in that category
        labelList.forEach(key => {
            // Selects the recipes labels and replaces the spaces with hyphens to match the API request format
            recipes[e.target.id].recipe[key].forEach(label => {
                label = label.replace(/ /g, '-')
                // Updates the rating to increase the rating of every label in the recipe categories
                rating = { ...rating, [key]: { ...rating[key], [label.toLowerCase()]: rating[key][label.toLowerCase()] + 1 } }
            })
        })
        // Sets loading to true to display the loading animation
        setLoading(true)
        // Dispatches the updateRating action to update the user's rating in the server database and secureLocalStorage
        dispatch(updateRating(rating))
        // Updates the userRating state to the new rating
        setUserRating(rating)
        // Calls getTwoRecipes to get two new recipes to display
        getTwoRecipes(pictures[1].index + 1, recipes)
    }

    const imageLoaded = () => {
        setLoading(false)
    }

    return (
        <div className='w-full lg:w-[65vw] mt-8 lg:mb-10 mb-5 pr-8 order-1 lg:order-2'>
            <div className='text-center'>
                <form className='ml-8 flex flex-col h-max shadow-xl rounded-xl' autoComplete='off' onSubmit={handleSubmit}>
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
                                {// Maps all selected tags to display them
                                clickedTags.map((tag) => {
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
                                {// Maps all tags that match the search to display them
                                searchResult.map((tag) => {
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
            <div className='flex flex-col items-center mt-5 ml-8 shadow-xl rounded-lg'>
                <h1 className='text-text-color-primary mt-2 text-2xl title-font'>Which is better?</h1>
                <p className='text-text-color-primary text-font'>Rate food to get recommendations based on your preferences</p>
                <div className='flex flex-row gap-12 mt-3'>
                    {//Displays the two recipes to let the user choose which one they prefer
                    pictures.map((pic) => {
                        return (
                            <div onClick={handleRating} className='w-44 h-fit md:w-60 text-center pb-5' key={pic.index}>
                                <img id={pic.index} className='rounded hover:border-4 hover:border-primary duration-100' src={pic.link} alt="food_pic" style={{ display: loading ? 'none' : 'block' }} onLoad={imageLoaded} />
                                <div style={{ display: loading ? 'flex' : 'none' }} className='w-full h-60 flex flex-col justify-center items-center rounded bg-gray-100'>
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