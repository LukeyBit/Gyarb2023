import secureLocalStorage from 'react-secure-storage'

// initial state of the auth reducer (store), the user is not logged in by default and the token is null and the user is an empty object
// sets the shape of the state
const initialState = {
    token: null,
    isAuthorized: false,
    user: {},
}

// The auth reducer, the state is the initial state by default and the action is an empty object by default
// The reducer is a function that takes the current state and an action as arguments, and returns a new state resulT
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            secureLocalStorage.setItem('token', action.payload.token)
            secureLocalStorage.setItem('user', action.payload.user)
            secureLocalStorage.setItem('isAuthorized', true)
            return {
                ...state,
                token: action.payload.token,
                isAuthorized: true,
                user: action.payload.user,
            }
        case 'LOGOUT':
            secureLocalStorage.clear()
            secureLocalStorage.setItem('isAuthorized', false)
            return {
                ...state,
                token: null,
                isAuthorized: false,
                user: {},
            }
        default:
            return state
    }
}

export default authReducer