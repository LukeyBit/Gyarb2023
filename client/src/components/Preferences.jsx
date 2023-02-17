import React, { useState } from 'react'

const Preferences = () => {

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

    const handleCheck = (e) => {
        e.preventDefault()
        const checked = e.target.checked
        const name = e.target.name
        if (checked) {
            setClickedTags([...clickedTags, name])
            setSearchResult(searchResult.filter(tag => tag !== name))
            setPreferenceTags(preferenceTags.filter(tag => tag !== name))
        } else {
            setClickedTags(clickedTags.filter(tag => tag !== name))
            setPreferenceTags([...preferenceTags, name])
            if (name.toLowerCase().includes(search)) {
                setSearchResult([...searchResult, name])
            }
        }
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


    return (
        <div className=' w-[65vw]'>
            <div>
                <h1 className='ml-8 subtitle-font font-semibold text-xl'>Tags</h1>
                <form className='ml-8 flex flex-row' autoComplete='off'>
                    <div className='relative z-0 mt-2 ml-2 mb-6 group flex flex-row py-auto'>
                        <input type="search" name="search" id="search" className="block py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer" placeholder=" " onChange={handleSearch} />
                        <label htmlFor="search" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Search for tags</label>
                    </div>
                    <div id='showTags'>
                        {clickedTags.map((tag, index) => {
                            return (
                                <div className='flex flex-row ml-8' key={index}>
                                    <input type="checkbox" checked={true} onChange={handleCheck} name={tag} id={tag} className='mt-2 mr-2' />
                                    <label htmlFor={tag} className='text-sm text-gray-500'>{tag}</label>
                                </div>
                            )
                        })}
                    </div>
                </form>
                <div id='showTagSearch'>
                    {searchResult.map((tag, index) => {
                        return (
                            <div className='flex flex-row ml-8' key={index}>
                                <input type="checkbox" onChange={handleCheck} name={tag} id={tag} className='mt-2 mr-2' />
                                <label htmlFor={tag} className='text-sm text-gray-500'>{tag}</label>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Preferences