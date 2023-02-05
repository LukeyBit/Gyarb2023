import axios from 'axios'

const url = 'http://localhost:5000/user'

export const loginUser = (credentials) => axios.post(`${url}/login`, credentials)

export const createUser = (newUser) => axios.post(`${url}/create`, newUser)

export const authUser = (token) => {
    let config = {
        headers: {
            'x-access-token': token
        }
    }
    return axios.post(`${url}/auth`,{}, config)
}