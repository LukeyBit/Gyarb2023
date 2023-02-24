import React, { useState } from 'react'

const Filters = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [filters, setFilters] = useState([
    'Vegan',
    'Vegetarian',
    'Pescatarian',
    'Lacto-Vegetarian',
    'Gluten Free',
    'Dairy Free',
    'Nut Free',
    'Soy Free',
    'Egg Free',
    'Peanut Free',
    'Tree Nut Free',
    'Fish Free',
    'Shellfish Free',
    'Sesame Free',
    'Wheat Free',
    'Sulfite Free',
    'Mustard Free',
    'Celery Free',
    'Lupine Free',
    'Mollusk Free',
    'Kosher',
    'Halal',
  ].sort())

  const [selectedFilters, setSelectedFilters] = useState([])

  const openMenu = () => {
    setDropdownOpen(!dropdownOpen)
  }

  const filterChange = (e) => {
    e.preventDefault()
    console.log(e.target.name)
    if (selectedFilters.includes(e.target.name)) {
      setSelectedFilters(selectedFilters.filter((filter) => filter !== e.target.name))
      setFilters([...filters, e.target.name].sort())
    } else {
      setSelectedFilters([...selectedFilters, e.target.name].sort())
      setFilters(filters.filter((filter) => filter !== e.target.name))
    }
  }

  return (
    <div className='mr-10 w-1/6 h-[calc(100vh-5vh)] scroll-m-1 top-0 bg-white drop-shadow-xl' >
      <div className='flex flex-col justify-center'>

        <button id='dropdownBgHoverButton' data-dropdown-toggle='dropdownBgHover' className='text-font w-full flex flex-row justify-center align-middle hover:bg-secondary' type='button' onClick={openMenu}>Dropdown checkbox
          <svg className='w-4 h-4 ml-2 my-auto' aria-hidden='true' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 9l-7 7-7-7'></path>
          </svg>
        </button>

        <div id='dropdownBgHover' className={`z-10 w-full rounded-lg ${dropdownOpen ? null : 'hidden'}`} >
          <ul className='text-sm h-[70vh] w-full overflow-y-scroll' aria-labelledby='dropdownBgHoverButton'>
            {selectedFilters.map((filter) => (
              <li key={filter} className='h-10 flex flex-row justify-start align-middle border-2 border-primary'>
                <input id={filter} type='checkbox' name={filter} className='peer' onChange={filterChange} checked />
                <label className='flex flex-row justify-center align-center text-center peer-checked' htmlFor={filter}>
                  {filter}
                </label>
              </li>
            ))}
            {filters.map((filter) => (
              <li key={filter} id={filter} className='h-10 flex flex-row justify-start align-middle'>
                <input type='checkbox' id={filter} name={filter} className='peer' onChange={filterChange} />
                <label htmlFor={filter} className='peer-checked flex flex-row justify-center align-center text-center'>
                  {filter}
                </label>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  )
}

export default Filters