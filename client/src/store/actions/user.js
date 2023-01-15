import * as api from '../../api'

export const loginUser = (credentials) => async (dispatch) => {
    try {
        const { data } = await api.loginUser(credentials)
        dispatch({ type: 'LOGIN', payload: data })
    } catch (error) {
        console.error(error.message)
    }
}

export const createUser = (newUser) => async (dispatch) => {
    try {
        const { data } = await api.createUser(newUser)
        dispatch({ type: 'CREATE', payload: data })
    } catch (error) {
        console.error(error.message)
    }
}

export const logoutUser = () => (dispatch) => {
    dispatch({ type: 'LOGOUT' })
}