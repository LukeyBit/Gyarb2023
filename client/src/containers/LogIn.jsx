import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../store/actions/userActions'
import secureLocalStorage from 'react-secure-storage'



const LogIn = () => {

  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const response = useSelector(store => store.response)

  const inputChange = (e) => {
    setCredentials({...credentials, [e.target.name]: e.target.value})
    if (credentials.username !== '' || credentials.password !== '') {
      dispatch({ type: 'CLEAR' })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    setCredentials({...credentials, [e.target.name]: e.target.value})

    if (credentials.username === '' || credentials.password === '') { 
      dispatch({ type: 'ERROR', payload: { success: false, message: 'Please fill in all fields' }})
    } else {
      dispatch(loginUser(credentials))
    }
  }
  
  useEffect(() => {
    if (secureLocalStorage.getItem('isAuthorized')) {
      navigate('/discover')
    }
  }, [response, navigate])

  return (
    <section className='login__section' >
      <div className='login__container'>
        <div className='form__box'>
          <div className='form__container'>
            <h1 className='form__title'>
              Sign in to your account
            </h1>
            <form autoComplete='off' className='space-y-4 md:space-y-6' onSubmit={handleSubmit} >
              <div>
                <label
                htmlFor='username'
                className='form__label' >
                  Your username
                </label>

                <input
                type='username'
                name='username'
                id='username'
                className='form__input'
                placeholder='awesomeuser123'
                required=''
                onChange={inputChange} />
              </div>

              <div>
                <label
                htmlFor='password'
                className='form__label' >
                  Password
                </label>

                <input
                type='password'
                name='password'
                id='password'
                placeholder='••••••••'
                className='form__input'
                required=''
                onChange={inputChange} />
              </div>
              
              <button
              type='submit'
              className='form__submit'
              >Sign in</button>
              <p className='form__link-text'>
                Don’t have an account yet? <Link to='/signup' className='form__link-link'>Sign up</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LogIn