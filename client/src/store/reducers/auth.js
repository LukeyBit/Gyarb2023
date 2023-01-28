import secureLocalStorage from 'react-secure-storage'

const initialState = {
    token: null,
    isAuthorized: false,
    user: {},
}

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
            console.log('LOGOUT')
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