import React, { useEffect, useState } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import * as userAPI from '../apis/userAPI'
import secureLocalStorage from 'react-secure-storage'

const ProtectedRoute = ({ requirement = true }) => {
    const [auth, setAuth] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const getAuth = async () => {
        try {
            const { data } = await userAPI.authUser(secureLocalStorage.getItem('token'))
            if (data.success) return true
        } catch (error) {
            return false
        }
    }

    useEffect(() => {
        getAuth().then(res => setAuth(res))
        console.log('auth', auth)
        console.log('requirement', requirement)
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