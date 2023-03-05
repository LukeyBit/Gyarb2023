import React, { useState } from 'react'

const Filter = ({filterName, filters}) => {
    const [items, setItems] = useState(filters)
    const [selectedItems, setSelectedItems] = useState([])
    const [dropdownOpen, setDropdownOpen] = useState(false)

    const openMenu = () => {
        setDropdownOpen(!dropdownOpen)
    }
    //TODO Update to add or remove selectedItems to sessionStorage using filterName as key and replace selectedItems with sessionStorage value completely as it will be obsolete
    const filterChange = (e) => {
        e.preventDefault()
        console.log(e.target.name)
        if (selectedItems.includes(e.target.name)) {
            setSelectedItems(selectedItems.filter((item) => item !== e.target.name))
            setItems([...items, e.target.name].sort())
        } else {
            setSelectedItems([...selectedItems, e.target.name].sort())
            setItems(items.filter((item) => item !== e.target.name))
        }
    }

    return (
        <>
            <button id='dropdownBgHoverButton' data-dropdown-toggle='dropdownBgHover' className='text-xl text-font w-full flex flex-row justify-center align-middle hover:bg-secondary' type='button' onClick={openMenu}>{filterName.charAt(0).toUpperCase() + filterName.slice(1)}
                <svg className='w-4 h-4 ml-2 my-auto' aria-hidden='true' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 9l-7 7-7-7'></path>
                </svg>
            </button>

            <div id='dropdownBgHover' className={`z-10 w-full rounded-lg ${dropdownOpen ? null : 'hidden'}`} >
                <ul className='text-sm h-full w-full max-h-[69vh] overflow-y-auto' aria-labelledby='dropdownBgHoverButton'>
                    {selectedItems.map((item) => (
                        <li key={item} className='h-10 flex flex-row justify-start align-middle border-2 border-primary'>
                            <input id={item} type='checkbox' name={item} className='ml-4 mr-2' onChange={filterChange} checked />
                            <label htmlFor={item} className='text-lg text-font flex flex-col justify-center align-middle'>
                                {item}
                            </label>
                        </li>
                    ))}
                    {items.map((item) => (
                        <li key={item} id={item} className='h-10 flex flex-row justify-start align-middle'>
                            <input type='checkbox' id={item} name={item} className='ml-4 mr-2' onChange={filterChange} />
                            <label htmlFor={item} className='text-lg text-font flex flex-col justify-center align-middle'>
                                {item}
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default Filter