const initialState = {
    success: null,
    message: null,
}

const responseReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SUCCESS':
            return {
                ...state,
                success: true,
                message: action.payload.message,
            }
        case 'ERROR':
            return {
                ...state,
                success: false,
                message: action.payload.message,
            }
        case 'CLEAR':
            return {
                ...initialState,
            }
        default:
            return state
    }
}

export default responseReducer