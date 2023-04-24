import * as userAPI from '../../apis/userAPI'
import secureLocalStorage from 'react-secure-storage'

/**
 * 
 * @param {object} credentials 
 * @returns {void}
 * 
 * @description Login a user and dispatch the user data to the store
 * or dispatch an error message to the store
 * 
 */
export const loginUser = (credentials) => async (dispatch) => {
    try {
        const { data } = await userAPI.loginUser(credentials)
        dispatch({ type: 'SUCCESS', payload: { success: true, message: 'Logged in successfully' }})
        dispatch({ type: 'LOGIN', payload: data })
    } catch (error) {
        dispatch({ type: 'ERROR', payload: error.response.data })
    }
}

/**
 * 
 * @param {object} newUser 
 * @returns {void}
 * 
 * @description Create a new user and dispatch the user data to the store
 * or dispatch an error message to the store
 * 
 */
export const createUser = (newUser) => async (dispatch) => {
    try {
        const { data } = await userAPI.createUser(newUser)
        dispatch({ type: 'SUCCESS', payload: { success: true, message: data.message }})
        dispatch(loginUser(newUser))
    } catch (error) {
        dispatch({ type: 'ERROR', payload: error.response.data })
    }
}

/**
 * 
 * @returns {void}
 * 
 * @description Logout a user and dispatch a success message to the store
 * 
 */
export const logoutUser = () => (dispatch) => {
    dispatch({ type: 'LOGOUT' })
    dispatch({ type: 'SUCCESS', payload: { success: true, message: 'Logged out successfully' }})
}

/**
 * 
 * @param {object} credentials 
 * @returns {void}
 * 
 * @description Update a user's password and dispatch a success message to the store
 * or dispatch an error message to the store
 * 
 */
export const updatePassword = (credentials) => async (dispatch) => {
    try {
        const { data } = await userAPI.updatePassword(secureLocalStorage.getItem('user').id, credentials.password, credentials.oldPassword, secureLocalStorage.getItem('token'))
        dispatch({ type: 'SUCCESS', payload: { success: true, message: data.message }})
    } catch (error) {
        dispatch({ type: 'ERROR', payload: error.response.data })
    }
}

/**
 * 
 * @param {string} username 
 * @returns {void}
 * 
 * @description Update a user's username and dispatch a success message to the store
 * or dispatch an error message to the store
 * 
 */
export const updateUsername = (username) => async (dispatch) => {
    try {
        const { data } = await userAPI.updateUsername(secureLocalStorage.getItem('user').id, username, secureLocalStorage.getItem('token'))
        dispatch({ type: 'SUCCESS', payload: { success: true, message: data.message }})
        const user = secureLocalStorage.getItem('user') 
        user.username = username
        secureLocalStorage.setItem('user', user)
    } catch (error) {
        dispatch({ type: 'ERROR', payload: error.response.data })
    }
}

/**
 * 
 * @param {object} tags 
 * @returns {void}
 * 
 * @description Update a user's tags and dispatch a success message to the store
 * or dispatch an error message to the store
 */
export const updateTags = (tags) => async (dispatch) => {
    try {
        const user = secureLocalStorage.getItem('user') 
        const { data } = await userAPI.updateTags(user.id, tags, secureLocalStorage.getItem('token'))
        dispatch({ type: 'SUCCESS', payload: { success: true, message: data.message }}) 
        user.preferences = tags
        secureLocalStorage.setItem('user', user)
    } catch (error) {
        dispatch({ type: 'ERROR', payload: error.response.data })
    }
}

/**
 * 
 * @param {object} rating 
 * @returns {void}
 * 
 * @description Update a user's rating and dispatch a success message to the store
 * or dispatch an error message to the store
 * 
 */
export const updateRating = (rating) => async (dispatch) => {
    try {
        const user = secureLocalStorage.getItem('user') 
        await userAPI.updateRating(user.id, rating, secureLocalStorage.getItem('token'))
        user.rating = rating
        secureLocalStorage.setItem('user', user)
    } catch (error) {
        dispatch({ type: 'ERROR', payload: error.response.data })
    }
}