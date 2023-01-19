import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducers/auth'
import responseReducer from './reducers/response'

export const store = configureStore({
  reducer: {
    user: authReducer, 
    response: responseReducer,
  }
})
