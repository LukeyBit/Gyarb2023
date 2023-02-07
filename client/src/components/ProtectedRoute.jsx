import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import secureLocalStorage from 'react-secure-storage'

const ProtectedRoute = ({ requirement = true }) => {
    const [auth, setAuth] = useState(secureLocalStorage.getItem('isAuthorized') || false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const response = useSelector(state => state.response)

    const checkAuth = useCallback(() => {
        setAuth(secureLocalStorage.getItem('isAuthorized') || false)
        if (auth !== requirement) {
            if (!response.message) { 
                if (requirement) {
                    dispatch({ type: 'ERROR', payload: { message: 'You must log in to visit this page' } })
                } else {
                    dispatch({ type: 'ERROR', payload: { message: 'You must be logged out to visit this page' } })
                }
            }
            navigate('/', { replace: true })
        }
    }, [auth, requirement, response.message, dispatch, navigate])

    useEffect(() => {
        checkAuth()
    }, [auth, checkAuth])

    return (
        <Outlet />
    )
}

export default ProtectedRoute