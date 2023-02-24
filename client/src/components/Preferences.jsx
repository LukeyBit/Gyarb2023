import React, { useState, useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updateTags } from '../store/actions/userActions'
import secureLocalStorage from 'react-secure-storage'

const Preferences = () => {

    let user = useRef(secureLocalStorage.getItem('user'))
    const dispatch = useDispatch()

    const [preferenceTags, setPreferenceTags] = useState([
        'Vegan',
        'Vegetarian',
        'Gluten Free',
        'Dairy Free',
        'Pescatarian',
        'Keto',
        'Paleo',
        'Low Carb'
    ])

    const [searchResult, setSearchResult] = useState([])
    const [clickedTags, setClickedTags] = useState([])
    const [search, setSearch] = useState('')

    useEffect(() => {
        setClickedTags([...user.current.preferences])
        setPreferenceTags(preferenceTags.filter(tag => !user.current.preferences.includes(tag)))
    },[])

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

    return (
        <div className='w-[65vw] pt-8 shadow-lg'>
            <div>
                <h1 className='ml-8 subtitle-font font-semibold text-xl'>Tags</h1>
                <form className='ml-8 flex flex-col h-52 shadow-lg rounded-xl' autoComplete='off' onSubmit={handleSubmit}>
                    <div className='flex flex-row'>
                        <div className='relative z-0 mt-2 ml-2 w-[25vw] h-12 mb-6 group flex flex-row py-auto'>
                            <input type="search" name="search" id="search" className="block py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-secondary appearance-none focus:outline-none focus:ring-0 focus:border-primary peer" placeholder=" " onChange={handleSearch} />
                            <label htmlFor="search" className="font-semibold peer-focus:font-medium absolute text-sm text-secondary duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Search for tags</label>
                        </div>
                        <div id='showTags' className='w-[25vw]'>
                            <h3>Choosen tags</h3>
                            {clickedTags.map((tag) => {
                                return (
                                    <div className='flex justify-center flex-row w-24 text-secondary ml-8 p-1 rounded border border-secondary hover:border-primary hover:text-primary hover:animate-pulse m-1' key={tag}>
                                        <input type="checkbox" checked={true} onChange={handleCheck} name={tag} id={tag} className='mt-2 mr-2 hidden peer' />
                                        <label htmlFor={tag} className='text-sm font-semibold cursor-pointer'>{tag}</label>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div id='showTagSearch' className='bg-gray-500 w-auto flex flex-row'>
                        {searchResult.map((tag) => {
                            return (
                                <div className='flex flex-row ml-8 w-24 rounded items-center hover:drop-shadow-2xl text-text-color-primary' key={tag}>
                                    <input type="checkbox" onChange={handleCheck} name={tag} id={tag} className='mt-2 mr-2 hidden peer cursor-pointer' />
                                    <label htmlFor={tag} className='text-sm font-semibold'>{tag}</label>
                                </div>
                            )
                        })}
                    </div>
                    <button type='submit'>Save tags</button>
                </form>
            </div>
        </div>
    )
}

export default Preferences