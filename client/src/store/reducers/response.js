// This reducer is used to store the response from the server
// The response is either a success or an error
// The response is stored in the store and then displayed to the user
const initialState = {
    success: null,
    message: null,
}

// The response reducer, the state is the initial state by default and the action is an empty object by default
// The reducer is a function that takes the current state and an action as arguments, and returns a new state result
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