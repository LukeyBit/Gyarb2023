import React, { useEffect, useState, useCallback } from 'react'
import { BiX, BiCheck } from 'react-icons/bi'
import { useSelector, useDispatch } from 'react-redux'

const Message = () => {
  const response = useSelector(store => store.response)
  const [show, setShow] = useState(false)
  const dispatch = useDispatch()
  
  const closeMessage = useCallback(() => {
    dispatch({ type: 'CLEAR' })
    setShow(false)
  }, [dispatch, setShow])

  useEffect(() => {
    if (response && response.message) {
      setShow(true)
      setTimeout(() => {
        closeMessage()
      }, 5000)
    } else {
      setShow(false)
    }
  }, [response, closeMessage])

  return (
      <div 
        className={`transition-all duration-500 ease-in-out p-2 w-3/4 md:w-fit  items-center justify-between rounded-full flex flex-row fixed left-1/2 top-20 z-10 drop-shadow-lg ${show 
          ? 'opacity-100 translate-x-[-50%] visible' 
          : 'opacity-0 translate-x-full hidden'} 
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
          onClick={closeMessage}
          />
      </div>
  )
}

export default Message