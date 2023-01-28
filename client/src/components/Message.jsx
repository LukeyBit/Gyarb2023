import React, { useEffect, useState } from 'react'
import { BiX, BiCheck } from 'react-icons/bi'
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
      }, 5000)
    } else {
      setShow(false)
    }
  }, [response])

  return (
      <div 
        className={`transition-all duration-500 ease-in-out p-2 md:w-fit sm:w-full items-center justify-between md:rounded-full flex flex-row md:fixed md:left-1/2 md:top-20 z-10 drop-shadow-lg ${show 
          ? 'opacity-100 md:translate-x-[-50%] sm:translate-x-0' 
          : 'opacity-0 translate-x-full'} 
          ${response.success ? 'bg-green-500' : 'bg-red-400'}
        `}
        
        role='alert'>
        <span className='flex w-8 h-8 rounded-full bg-white uppercase ml-2 mr-4 text-text-color-secondary items-center justify-center text-xl font-bold'>
          {
            response.success
            ? <BiCheck size={30} />
            : '!'
          }
        </span>
        <span className='text-font mr-2 text-white w-fit'>{response.message}</span>
        <BiX
          className='mr-2 w-8 h-8 hover:cursor-pointer hover:text-white'
          onClick={() => setShow(false)}
          />
      </div>
  )
}

export default Message