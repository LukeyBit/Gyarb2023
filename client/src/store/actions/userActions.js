import * as userAPI from '../../apis/userAPI'

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