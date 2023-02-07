import React, { useEffect, useState } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import secureLocalStorage from 'react-secure-storage'

const ProtectedRoute = ({ requirement = true }) => {
    const [auth, setAuth] = useState(secureLocalStorage.getItem('isAuthorized') || false)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    useEffect(() => {
        setAuth(secureLocalStorage.getItem('isAuthorized') || false)
        if (auth !== requirement) {
            if (requirement) {
                dispatch({ type: 'ERROR', payload: {message: 'You must log in to visit this page'} })
                navigate('/', { replace: true })
            } else {
                dispatch({ type: 'ERROR', payload: {message: 'You must log out to visit this page'} })
                navigate('/', { replace: true })
            }
        }
    }, [auth, navigate, requirement, dispatch])

  return (
    <Outlet />
  )
}

export default ProtectedRoute