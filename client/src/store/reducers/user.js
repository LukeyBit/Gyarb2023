import secureLocalStorage from 'react-secure-storage'

const userReducer = (state = [], action) => {
    switch ( action.type ) {
        case 'LOGIN':
            secureLocalStorage.setItem('profile', { ...action?.payload.data })
            return { ...state, authData: action?.payload.data }
        case 'CREATE':
            secureLocalStorage.setItem('profile', { ...action?.payload.data })
            return { ...state, authData: action?.payload.data }
        case 'LOGOUT':
            secureLocalStorage.clear()
            return { ...state, authData: null }
        default:
            return state
    }
}

export default userReducer