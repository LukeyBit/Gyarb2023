import React, { useEffect, useState } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { checkAuth } from '../hooks'

const ProtectedRoute = ({ requirement = true }) => {
    const [auth, setAuth] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const getAuth = async () => {
        const state = await checkAuth()
        setAuth(state)
    }

    useEffect(() => {
        getAuth()
        console.log('auth', auth)
        console.log('requirement', requirement)
        if (auth !== requirement) {
            if (requirement) {
                dispatch({ type: 'ERROR', payload: {message: 'You must log in to visit this page'} })
                navigate('/', { replace: true })
            } else {
                navigate('/', { replace: true })
            }
        }
    }, [auth, navigate, requirement, dispatch])

  return (
    <Outlet />
  )
}

export default ProtectedRoute