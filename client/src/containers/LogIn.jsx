import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../store/actions/userActions'



const LogIn = () => {

  const [credentials, setCredentials] = useState({username: '', password: ''})
  const [formError, setError] = useState({message: ''})
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const response = useSelector(store => store.response)

  const inputChange = (e) => {
    setCredentials({...credentials, [e.target.name]: e.target.value})
    if (credentials.username !== '' || credentials.password !== '') {
      setError({message: null})
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    setCredentials({...credentials, [e.target.name]: e.target.value})

    if (credentials.username === '' || credentials.password === '') { 
      setError({...formError, message: 'Please fill in all fields'})
    } else {
      dispatch(loginUser(credentials))
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