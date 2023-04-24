import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createUser } from '../store/actions/userActions'
import { useNavigate } from 'react-router-dom'


const SignUp = () => {
  // Set credentials state to an object with the keys username and password
  const [credentials, setCredentials] = useState({username: '', password: ''})
  // Set formError state to an object with the key message
  const [formError, setError] = useState({message: ''})
  // Set dispatch to the value of the useDispatch hook
  const dispatch = useDispatch()
  // Set response to the value of the response state
  const response = useSelector(store => store.response)
  // Set navigate to the value of the useNavigate hook
  const navigate = useNavigate()

  // Regex for username validation (only letters and numbers)
  const usernameRegex = /^[a-zåäöA-ZÅÄÖ0-9]+$/

  // Update credentials state when the value of the input changes
  const inputChange = (e) => {
    // Set the value of the input to the corresponding key, the input name, in the credentials state
    setCredentials({...credentials, [e.target.name]: e.target.value})
    // Clear the response state and error message if the user starts typing in the input
    if (credentials.username !== '' || credentials.password !== '') {
      setError({message: null})
    }
  }

  // Create a new user
  const handleSubmit = (e) => {
    e.preventDefault()
    // If the username or password is shorter than 3 characters, dispatch an error message to the response state
    if (credentials.username.length < 3 || credentials.password.length < 3) {
      setError({...formError, message: 'Usernames and passwords must be at least 3 characters long'})
      dispatch({type: 'ERROR', payload: {message: 'Usernames and passwords must be at least 3 characters long'}})
    } else if (!usernameRegex.test(credentials.username)) {
      // If the username doesn't match the regex, dispatch an error message to the response state
      setError({...formError, message: 'Usernames can only contain only letters and numbers'})
      dispatch({type: 'ERROR', payload: {message: 'Usernames can only contain only letters and numbers'}})
    } else {
      // If the username and password are valid, dispatch the createUser action
      dispatch(createUser(credentials))
    }
  }

  // If the response state is successful, navigate to the profile page
  useEffect(() => {
    if (response.success) {
      navigate('/profile')
    } else {
      setError({ message: response.message })
    }
  }, [response, navigate])

  return (
    <section className="bg-white h-[calc(100vh-7rem)] flex flex-col justify-center items-center">
      <div className="w-full flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className='w-full bg-white rounded-lg drop-shadow-xl md:mt-0 sm:max-w-md xl:p-0'>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 className='title-font text-xl leading-tight tracking-tight text-text-color-primary md:text-3xl'>
              Sign up for an account
            </h1>
            {
              formError.message ? <p className='text-red-500 text-sm' aria-live='assertive' >{formError.message}</p>
              : null
            }
            <form autoComplete='off' className='space-y-4 md:space-y-6' onSubmit={handleSubmit} >
              <div>
                <label
                htmlFor='username'
                className={`text-font block mb-2 text-sm font-medium text-text-color-primary ${formError.message ? 'text-red-500 text-sm' : null}`}>
                  Choose a username
                </label>

                <input
                type='username'
                name='username'
                id='username'
                className='subtitle-font justify-center align-middle bg-gray-50 border-gray-300 border text-text-color-primary sm:text-sm rounded-lg focus:ring-primary focus:outline-none focus:border-primary focus:border block w-full p-2.5'
                placeholder='awesomeuser123'
                required=''
                onChange={inputChange} />
              </div>

              <div>
                <label
                htmlFor='password'
                className={`text-font block mb-2 text-sm font-medium text-text-color-primary ${formError.message ? 'text-red-500 text-sm' : null}`}>
                  Choose a password
                </label>

                <input
                type='password'
                name='password'
                id='password'
                placeholder='••••••••'
                className='subtitle-font justify-center align-middle bg-gray-50 border-gray-300 border text-text-color-primary sm:text-sm rounded-lg focus:ring-primary focus:outline-none focus:border-primary focus:border block w-full p-2.5'
                required=''
                onChange={inputChange} />
              </div>
              
              <button
              type='submit'
              className='text-font w-full text-white bg-primary hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-secondary font-medium rounded-lg text-sm px-5 py-2.5 text-center'
              >Sign up</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SignUp