import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducers/auth'
import responseReducer from './reducers/response'

/**
 * 
 * @returns {void}
 * 
 * @description Create the global store and add the reducers to it, setting the initial state of the store to the initial state of the reducers
 */
export const store = configureStore({
  reducer: {
    user: authReducer, 
    response: responseReducer,
  }
})
