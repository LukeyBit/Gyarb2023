import React, { useState, useEffect, useRef } from 'react'
import secureLocalStorage from 'react-secure-storage'
import { useDispatch, useSelector } from 'react-redux'
import { updatePassword, updateUsername } from '../store/actions/userActions'

const Settings = () => {
    const user = useRef(secureLocalStorage.getItem('user') || {})
    const [credentials, setCredentials] = useState({ password: '', oldPassword: '' })
    const [username, setUsername] = useState({ username: '' })
    const dispatch = useDispatch()
    const response = useSelector(state => state.response)

    const passwordChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
        if (credentials.oldPassword !== '' || credentials.password !== '') {
            dispatch({ type: 'CLEAR' })
        }
    }

    const usernameChange = (e) => {
        setUsername({ ...username, [e.target.name]: e.target.value })
        if (username.username !== '') {
            dispatch({ type: 'CLEAR' })
        }
    }

    useEffect(() => {
        if (response.success) {
            user.current = secureLocalStorage.getItem('user')
        }
    }, [response])

    const handleUsernameSubmit = (e) => {
        e.preventDefault()

        if (username.username === '') {
            dispatch({ type: 'ERROR', payload: { success: false, message: 'Please fill in all fields' } })
        } else {
            dispatch(updateUsername(username))
        }
    }


    const handlePasswordSubmit = (e) => {
        e.preventDefault()

        if (credentials.password === '') {
            dispatch({ type: 'ERROR', payload: { success: false, message: 'Please fill in all fields' } })
        } else {
            dispatch(updatePassword(credentials))

        }
    }

    return (
        <div className='md:w-[35vw] mt-8'>
            <div className='ml-8 shadow-lg rounded-lg p-12'>
                <h1 className='title-font text-2xl text-center'>Update your profile</h1>
                <form autoComplete='off' onSubmit={handleUsernameSubmit} className='p-4'>
                    <div className='mt-2 ml-2 mb-6 py-auto'>
                        <label htmlFor="username" className="text-font block text-sm font-medium text-text-color-primary">New username</label>
                        <input type="username" name='username' id='username' className='subtitle-font justify-center align-middle bg-gray-50 border-gray-300 border text-text-color-primary sm:text-sm rounded-lg focus:ring-primary focus:outline-none focus:border-primary focus:border block w-full p-2.5' placeholder={user.current.username} onChange={usernameChange} />
                        <button type='submit' className='text-font w-full text-white bg-primary hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-secondary font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-3'>Update username</button>
                    </div>
                </form>
                <form autoComplete='off' onSubmit={handlePasswordSubmit} className='p-4'>
                    <div className='mt-2 ml-2 mb-6 py-auto'>
                        <label htmlFor="password" className="text-font block text-sm font-medium text-text-color-primary">New password</label>
                        <input type="password" name="password" id="password" className="subtitle-font justify-center align-middle bg-gray-50 border-gray-300 border text-text-color-primary sm:text-sm rounded-lg focus:ring-primary focus:outline-none focus:border-primary focus:border block w-full p-2.5" placeholder="••••••••" onChange={passwordChange} />
                    </div>
                    <div className='mt-2 ml-2 mb-6 py-auto'>
                        <label htmlFor="oldPassword" className="text-font block text-sm font-medium text-text-color-primary">Old password</label>
                        <input type="password" name="oldPassword" id="oldPassword" className="subtitle-font justify-center align-middle bg-gray-50 border-gray-300 border text-text-color-primary sm:text-sm rounded-lg focus:ring-primary focus:outline-none focus:border-primary focus:border block w-full p-2.5" placeholder="••••••••" onChange={passwordChange} />
                        <button type='submit' className='text-font w-full text-white bg-primary hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-secondary font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-3'>Update password</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Settings