
const initialState = {
    token: null,
    isAuthorized: false,
    user: {},
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                token: action.payload.token,
                isAuthorized: true,
                user: action.payload.user,
            }
        case 'LOGOUT':
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