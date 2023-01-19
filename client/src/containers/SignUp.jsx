import React, { useState } from 'react'

const SignUp = () => {
  const [credentials, setCredentials] = useState({username: '', password: ''})
  const [formError, setError] = useState({message: ''})

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
      // dispatch(signUpUser(credentials))
    }
  }

  return (
    <div>SignUp</div>
  )
}

export default SignUp