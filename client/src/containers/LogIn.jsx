import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../store/actions/userActions'



const LogIn = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const response = useSelector(state => state.response)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const inputChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
    if (credentials.username !== '' || credentials.password !== '') {
      dispatch({ type: 'CLEAR' })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (credentials.username === '' || credentials.password === '') {
      dispatch({ type: 'ERROR', payload: { success: false, message: 'Please fill in all fields' } })
    } else {
      dispatch(loginUser(credentials))
      if (response.success) {
        navigate('/discover', { replace: true })
      }
    }
  }

  return (
    <section className='bg-white h-[calc(100vh-7rem)] flex flex-col justify-center items-center' >
      <div className='w-full flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
        <div className='w-full bg-white rounded-lg drop-shadow-xl md:mt-0 sm:max-w-md xl:p-0'>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 className='title-font text-xl leading-tight tracking-tight text-text-color-primary md:text-3xl'>
              Sign in to your account
            </h1>
            <form autoComplete='off' className='space-y-4 md:space-y-6' onSubmit={handleSubmit} >
              <div>
                <label
                  htmlFor='username'
                  className='text-font block mb-2 text-sm font-medium text-text-color-primary' >
                  Your username
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
                  className='text-font block mb-2 text-sm font-medium text-text-color-primary' >
                  Password
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
              >Sign in</button>
              <p className='text-sm subtitle-font font-light text-text-color-secondary'>
                Don’t have an account yet? <Link to='/signup' className='font-bold text-text-color-primary hover:underline'>Sign up</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LogIn