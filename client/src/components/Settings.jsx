import React, { useState, useEffect, useRef } from 'react'
import secureLocalStorage from 'react-secure-storage'
import { useDispatch, useSelector } from 'react-redux'
import { updatePassword, updateUsername } from '../store/actions/userActions'

/**
 * 
 * @returns {JSX.Element} Settings component
 * 
 * @description This component renders the settings component where the user can update their password and username
 * 
 */
const Settings = () => {
    // Set user to the value of the secureLocalStorage item 'user' or an empty object if it doesn't exist
    const user = useRef(secureLocalStorage.getItem('user') || {})
    // Set credentials state to an object with the keys oldPassword and password
    const [credentials, setCredentials] = useState({ password: '', oldPassword: '', username: '' })
    const dispatch = useDispatch()
    const response = useSelector(state => state.response)

    // Update credentials state when the value of the input changes
    const updateCredentials = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
        if (credentials.oldPassword !== '' || credentials.password !== '') {
            dispatch({ type: 'CLEAR' })
        }
    }

    // Update user.current when the response state changes
    useEffect(() => {
        if (response.success) {
            user.current = secureLocalStorage.getItem('user')
        }
    }, [response])

    // Update the user's username
    const handleUsernameSubmit = (e) => {
        e.preventDefault()

        if (credentials.username === '') {
            dispatch({ type: 'ERROR', payload: { success: false, message: 'Please fill in a username' } })
        } else {
            dispatch(updateUsername(credentials.username))
        }
    }

    // Update the user's password
    const handlePasswordSubmit = (e) => {
        e.preventDefault()

        if (credentials.password === '') {
            dispatch({ type: 'ERROR', payload: { success: false, message: 'Please fill in all password fields' } })
        } else {
            dispatch(updatePassword(credentials))
        }
    }

    return (
        <div className='lg:w-[35vw] lg:mt-8 mt-0 mb-10 lg:mb-0 lg:pr-0 pr-8 order-2 lg:order-1'>
            <div className='ml-8 shadow-xl rounded-lg p-12'>
                <h1 className='title-font text-2xl text-center'>Update your profile</h1>
                <form autoComplete='off' onSubmit={handleUsernameSubmit} className='p-4'>
                    <div className='mt-2 ml-2 mb-6 py-auto'>
                        <label htmlFor="username" className="text-font block text-sm font-medium text-text-color-primary">New username</label>
                        <input type="username" name='username' id='username' className='subtitle-font justify-center align-middle bg-gray-50 border-gray-300 border text-text-color-primary sm:text-sm rounded-lg focus:ring-primary focus:outline-none focus:border-primary focus:border block w-full p-2.5' placeholder={user.current.username} onChange={updateCredentials} />
                        <button type='submit' className='text-font w-full text-white bg-primary hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-secondary font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-3'>Update username</button>
                    </div>
                </form>
                <form autoComplete='off' onSubmit={handlePasswordSubmit} className='p-4'>
                    <div className='mt-2 ml-2 mb-6 py-auto'>
                        <label htmlFor="password" className="text-font block text-sm font-medium text-text-color-primary">New password</label>
                        <input type="password" name="password" id="password" className="subtitle-font justify-center align-middle bg-gray-50 border-gray-300 border text-text-color-primary sm:text-sm rounded-lg focus:ring-primary focus:outline-none focus:border-primary focus:border block w-full p-2.5" placeholder="••••••••" onChange={updateCredentials} />
                    </div>
                    <div className='mt-2 ml-2 mb-6 py-auto'>
                        <label htmlFor="oldPassword" className="text-font block text-sm font-medium text-text-color-primary">Old password</label>
                        <input type="password" name="oldPassword" id="oldPassword" className="subtitle-font justify-center align-middle bg-gray-50 border-gray-300 border text-text-color-primary sm:text-sm rounded-lg focus:ring-primary focus:outline-none focus:border-primary focus:border block w-full p-2.5" placeholder="••••••••" onChange={updateCredentials} />
                        <button type='submit' className='text-font w-full text-white bg-primary hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-secondary font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-3'>Update password</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Settings