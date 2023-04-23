import React, { useState } from 'react'

/**
 * 
 * @param {object} params containing filterName and filterItems where filterName is the name of the filter and filterItems is an array of items to be filtered by
 * @returns {JSX.Element} Filter component
 * @description Filter component for the Filters component sidebar on the Search page
 * 
 */
const Filter = ({ filterName, filterItems }) => {

    /**
     * 
     * @returns {array} array of items currently in the filter from sessionStorage
     * 
     * @description Gets the current items in the filter from sessionStorage where the key is the filterName and the value is an array of items in the filter category designated by filterName
     * 
     */
    const currentItems = () => {
        let filters = JSON.parse(sessionStorage.getItem('filters')) || {}
        return filters[filterName] || []
    }
    /**
     * 
     * @param {string} item to be added to the filter
     * @returns {void}
     * 
     * @description Adds an item to the filter in sessionStorage
     * 
     */
    const addItem = (item) => {
        sessionStorage.setItem('filters', JSON.stringify({ ...JSON.parse(sessionStorage.getItem('filters')), [filterName]: [...currentItems(), item] }))
    }

    /**
     * 
     * @param {string} item to be removed from the filter
     * @returns {void}
     * 
     * @description Removes an item from the filter in sessionStorage
     *  
     */
    const removeItem = (item) => {
        sessionStorage.setItem('filters', JSON.stringify({ ...JSON.parse(sessionStorage.getItem('filters')), [filterName]: currentItems().filter((i) => i !== item) }))
    }

    // items is the list of items that are not currently selected in the filter
    const [items, setItems] = useState(filterItems.filter((item) => !currentItems().includes(item)).sort())

    // dropdownOpen is the state of the dropdown menu
    const [dropdownOpen, setDropdownOpen] = useState(false)

    // toggleMenu toggles the dropdown menu
    const toggleMenu = () => {
        setDropdownOpen(!dropdownOpen)
    }

    /**
     * 
     * @param {Event} e event object from the onChange event listener on the input element
     * @returns {void}
     * 
     * @description Adds or removes an item from the currently selected items in the filter
     */
    const filterChange = (e) => {
        e.preventDefault()
        // if the item is already in the filter, remove it, otherwise add it and remove it from the items array
        if (currentItems().includes(e.target.name)) {
            removeItem(e.target.name)
            setItems([...items, e.target.name].sort())
        } else {
            addItem(e.target.name)
            setItems(items.filter((item) => item !== e.target.name).sort())
        }
    }

    return (
        // A dropdown menu with a button to toggle the menu and a list of items to be filtered by
        // Maps the current items in the filter on the top of the list and the remaining items in the items array below
        // The items in the list are checkboxes that are checked if the item is in the filter and unchecked if it is not
        <>
            <button id='dropdownBgHoverButton' data-dropdown-toggle='dropdownBgHover' className='text-xl text-font w-full flex flex-row justify-start pl-4 align-middle hover:bg-secondary' type='button' onClick={toggleMenu}>{filterName.charAt(0).toUpperCase() + filterName.slice(1)}
                <svg className='w-4 h-4 ml-2 my-auto' aria-hidden='true' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 9l-7 7-7-7'></path>
                </svg>
            </button>

            <div id='dropdownBgHover' className={`z-10 w-full rounded-lg ${dropdownOpen ? null : 'hidden'}`} >
                <ul className='text-sm h-full w-full max-h-[61vh] overflow-y-auto' aria-labelledby='dropdownBgHoverButton'>
                    {// Maps the current items in the filter on the top of the list
                    currentItems().map((item) => (
                        <li key={item} className='h-10 flex flex-row justify-start align-middle border-2 border-primary'>
                            <input id={item} type='checkbox' name={item} className='ml-4 mr-2' onChange={filterChange} checked />
                            <label htmlFor={item} className='text-lg text-font flex flex-col justify-center align-middle'>
                                {item}
                            </label>
                        </li>
                    ))}
                    {// Maps the unselected items in the items array below
                    items.map((item) => (
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