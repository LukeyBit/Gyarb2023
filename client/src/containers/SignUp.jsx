import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createUser } from '../store/actions/userActions'
import { useNavigate } from 'react-router-dom'


const SignUp = () => {
  const [credentials, setCredentials] = useState({username: '', password: ''})
  const [formError, setError] = useState({message: ''})
  const dispatch = useDispatch()
  const response = useSelector(store => store.response)
  const navigate = useNavigate()

  const usernameRegex = /^[a-zA-Z0-9]{3,}$/

  const inputChange = (e) => {
    setCredentials({...credentials, [e.target.name]: e.target.value})
    if (credentials.username !== '' || credentials.password !== '') {
      setError({message: null})
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!usernameRegex.test(credentials.username)) {
      setError({...formError, message: 'Username and password must be at least 3 characters long and contain only letters and numbers'})
    } else {
      dispatch(createUser(credentials))
    }
  }

  const loginError = () => {
    setError({...formError, message: response.message})
  }

  useEffect(() => {
    if (response.success) {
      navigate('/discover')
    } else {
      loginError()
    }
  }, [response, navigate])

  return (
    <section className="signUp__section">
      <div className="signUp__container">
      <div className='form__box'>
          <div className='form__container'>
            <h1 className='form__title'>
              Sign up for an account
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
                  Choose a username
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
                  Choose a password
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
              >Sign up</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SignUp