import * as userAPI from '../../apis/userAPI'
import secureLocalStorage from 'react-secure-storage'

export const loginUser = (credentials) => async (dispatch) => {
    try {
        const { data } = await userAPI.loginUser(credentials)
        dispatch({ type: 'SUCCESS', payload: { success: true, message: 'Logged in successfully' }})
        dispatch({ type: 'LOGIN', payload: data })
    } catch (error) {
        dispatch({ type: 'ERROR', payload: error.response.data })
    }
}

export const createUser = (newUser) => async (dispatch) => {
    try {
        const { data } = await userAPI.createUser(newUser)
        dispatch({ type: 'SUCCESS', payload: { success: true, message: 'User created successfully' }})
        dispatch({ type: 'LOGIN', payload: data })
    } catch (error) {
        dispatch({ type: 'ERROR', payload: error.response.data })
    }
}

export const logoutUser = () => (dispatch) => {
    dispatch({ type: 'LOGOUT' })
    dispatch({ type: 'SUCCESS', payload: { success: true, message: 'Logged out successfully' }})
}

export const updatePassword = (credentials) => async (dispatch) => {
    try {
        const { data } = await userAPI.updatePassword(secureLocalStorage.getItem('user').id, credentials.password, credentials.oldPassword)
        dispatch({ type: 'SUCCESS', payload: { success: true, message: data.message }})
    } catch (error) {
        dispatch({ type: 'ERROR', payload: error.response.data })
    }
}

export const updateUsername = (username) => async (dispatch) => {
    try {
        const { data } = await userAPI.updateUsername(secureLocalStorage.getItem('user').id, username.username)
        dispatch({ type: 'SUCCESS', payload: { success: true, message: data.message }})
        const user = secureLocalStorage.getItem('user') 
        user.username = username.username
        secureLocalStorage.setItem('user', user)
    } catch (error) {
        dispatch({ type: 'ERROR', payload: error.response.data })
    }
}