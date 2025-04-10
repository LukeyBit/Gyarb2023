import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import secureLocalStorage from 'react-secure-storage'

/**
 * 
 * @param {object} params requirement - boolean value to determine if user must be logged in or logged out to access the route
 * @returns {JSX.Element} ProtectedRoute component
 * 
 * @description A component that checks if the user is logged in or logged out before rendering the route
 */
const ProtectedRoute = ({ requirement = true }) => {
    // Set auth to the value of the secureLocalStorage item 'isAuthorized' or false if it doesn't exist
    const [auth, setAuth] = useState(secureLocalStorage.getItem('isAuthorized') || false)
    // Get dispatch function from useDispatch hook
    const dispatch = useDispatch()
    // Get navigate function from useNavigate hook
    const navigate = useNavigate()
    
    // Get response object from useSelector hook
    const response = useSelector(state => state.response)

    /**
     * @returns {void} as it only sets the auth state or redirects the user to the home page
     */
    const checkAuth = useCallback(() => {
        // Update auth state
        setAuth(secureLocalStorage.getItem('isAuthorized') || false)
        // If the users logged in state doesn't match the requirement, redirect them to the home page
        if (auth !== requirement) {
            // If there is no pending message, set the error message to the appropriate message
            if (!response.message) { 
                if (requirement) {
                    dispatch({ type: 'ERROR', payload: { message: 'You must log in to visit this page' } })
                } else {
                    dispatch({ type: 'ERROR', payload: { message: 'You must be logged out to visit this page' } })
                }
            }
            // Redirect the user to the home page
            navigate('/', { replace: true })
        }
    }, [auth, requirement, response.message, dispatch, navigate])

    // Check if the user is logged in or logged out when the component mounts and when the auth state changes
    useEffect(() => {
        checkAuth()
    }, [auth, checkAuth])

    return (// If the user passes checkAuth, render the route
        <Outlet />
    )
}

export default ProtectedRoute