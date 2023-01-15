import React from 'react'
import { Link } from 'react-router-dom'

const LogIn = () => {
  return (
    <section className='login__section' >
      <div class='login__container'>
        <div class='form__box'>
          <div class='form__container'>
            <h1 class='form__title'>
              Sign in to your account
            </h1>
            <form class='space-y-4 md:space-y-6' action='#'>
              <div>
                <label for='email' class='form__label'>Your email</label>
                <input type='email' name='email' id='email' class='form__input' placeholder='name@company.com' required='' />
              </div>
              <div>
                <label for='password' class='form__label'>Password</label>
                <input type='password' name='password' id='password' placeholder='••••••••' class='form__input' required='' />
              </div>
              
              <button
              type='submit'
              class='form__submit'
              >Sign in</button>
              <p class='form__link-text'>
                Don’t have an account yet? <Link to='/signup' class='form__link-link'>Sign up</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LogIn