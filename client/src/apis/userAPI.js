import axios from 'axios'

const url = 'http://localhost:5000/user'

export const loginUser = (credentials) => axios.post(`${url}/login`, credentials)

export const createUser = (newUser) => axios.put(`${url}/create`, newUser)

export const updatePassword = (id, password, oldPassword, token) => {
    let config = {
        headers: {
            'X-Auth-Token': token
        }
    }
    return axios.patch(`${url}/updatePassword`, {id, password, oldPassword}, {}, config)
}

export const updateUsername = (id, username, token) => {
    let config = {
        headers: {
            'X-Auth-Token': token
        }
    }
    return axios.patch(`${url}/updateUsername`, {id, username}, {}, config)
}
