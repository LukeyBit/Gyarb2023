import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import  secureLocalStorage from 'react-secure-storage'
import { loginUser } from '../api'


const LogIn = () => {

  const [credentials, setCredentials] = useState({username: '', password: ''})
  const [formError, setError] = useState({message: ''})
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const inputChange = (e) => {
    setCredentials({...credentials, [e.target.name]: e.target.value})
    if (credentials.username !== '' || credentials.password !== '') {
      setError({message: null})
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    //Move validation to sign up page
    const usernameRegex = /^[a-zA-Z0-9]{3,}$/

    setCredentials({...credentials, [e.target.name]: e.target.value})

    if (credentials.username === '' || credentials.password === '') {
      
      setError({...formError, message: 'Please fill in all fields'})
    } else if (!usernameRegex.test(credentials.username)) {
      setError({...formError, message: 'Username and password must be at least 3 characters long and contain only letters and numbers'})
    } else {
      loginUser(credentials)
      .then(res => {
        if (res.status === 200) {
          secureLocalStorage.setItem('token', res.data.token)
          secureLocalStorage.setItem('user', res.data.user)
          secureLocalStorage.setItem('isAuthorized', true)
          dispatch({type: 'LOGIN', payload: res.data})
          navigate('/discover', { replace: true })
        }
      })
      .catch(err => {
        if (err.status === 401) {
          setError({...formError, message: 'Username or password incorrect'})
        } else {
          setError({...formError, message: 'Something went wrong, please try again'})
        }
      })
    }
  }

  return (
    <section className='login__section' >
      <div className='login__container'>
        <div className='form__box'>
          <div className='form__container'>
            <h1 className='form__title'>
              Sign in to your account
            </h1>
            {
              formError.message ? <p className='form__error' aria-live='assertive' >{formError.message}</p>
              : null
            }
            <form autoComplete='off' className='space-y-4 md:space-y-6' onSubmit={handleSubmit} >
              <div>
                <label
                htmlFor='username'
                className={`form__label ${formError.message ? 'form__error' : null}`}>
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
                className={`form__label ${formError.message ? 'form__error' : null}`}>
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