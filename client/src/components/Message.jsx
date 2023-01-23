import React, { useEffect, useState } from 'react'
import { BiX } from 'react-icons/bi'
import { useSelector } from 'react-redux'

const Message = () => {
  const response = useSelector(store => store.response)
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (response && response.message) {
      console.log('response', response)
      setShow(true)
      setTimeout(() => {
        setShow(false)
      }, 10000)
    }
  }, [response])

  return (
      <div 
        className={`transition-all duration-500 ease-in-out p-2 md:w-1/3 sm:w-full items-center justify-between lg:rounded-full flex flex-row lg:fixed md:left-1/2 md:top-20 z-10 drop-shadow-lg ${show 
          ? 'opacity-100 md:translate-x-[-50%] sm:translate-x-0' 
          : 'opacity-0 translate-x-full'} 
          ${response.success ? 'bg-green-500' : 'bg-red-400'}
        `}
        
        role='alert'>
        <span className='flex rounded-full bg-white uppercase px-2 py-1 text-xs font-bold ml-2 text-text-color-secondary'>Update</span>
        <span className='text-font mr-2 text-white'>{response.message}</span>
        <BiX
          className='mr-2 w-8 h-8 hover:cursor-pointer hover:text-white'
          onClick={() => setShow(false)}
          />
      </div>
  )
}

export default Message