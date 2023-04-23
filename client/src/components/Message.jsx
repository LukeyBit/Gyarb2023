import React, { useEffect, useState, useCallback } from 'react'
import { BiX, BiCheck } from 'react-icons/bi'
import { useSelector, useDispatch } from 'react-redux'

/**
 * 
 * @returns {JSX.Element} Message component
 * 
 * @description Message component for displaying messages to the user
 * 
 */
const Message = () => {
  // Selects the response object from the store which is a response to user actions
  const response = useSelector(store => store.response)
  // show is the state of the message component which is used to determine if the message should be visible or not
  const [show, setShow] = useState(false)
  // dispatch is used to dispatch actions to the store which in turn updates the state. Actions are defined in /store/actions/userActions.js or store reducers
  const dispatch = useDispatch()
  
  // closeMessage is a callback function which dispatches the CLEAR action to the store which clears the pending responses from the response object in the store and sets show to false
  const closeMessage = useCallback(() => {
    dispatch({ type: 'CLEAR' })
    setShow(false)
  }, [dispatch, setShow])

  // useEffect is used to determine if the response object has a pending message and if it does then show the message and set a timeout to close the message after 5 seconds
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
        // The message component is a fixed component which is positioned at the top of the screen and is translated to the left by 50% to center it
        // The message component is hidden by default and is only visible when the show state is true
        // The message component is styled based on the response type
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