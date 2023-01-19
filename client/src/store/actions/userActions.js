import * as api from '../../api'

export const loginUser = (credentials) => async (dispatch) => {
    try {
        const { data } = await api.loginUser(credentials)
        dispatch({ type: 'SUCCESS', payload: { success: true, message: 'Logged in successfully' }})
        dispatch({ type: 'LOGIN', payload: data })
    } catch (error) {
        dispatch({ type: 'ERROR', payload: error.response.data })
    }
}

export const createUser = (newUser) => async (dispatch) => {
    try {
        const { data } = await api.createUser(newUser)
        dispatch({ type: 'SUCCESS', payload: { success: true, message: 'User created successfully' }})
        dispatch({ type: 'LOGIN', payload: data })
    } catch (error) {
        dispatch({ type: 'ERROR', payload: error.response.data })
    }
}