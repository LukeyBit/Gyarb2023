import axios from 'axios'

const url = 'http://localhost:5000/user'

export const loginUser = (credentials) => axios.post(`${url}/login`, credentials)

export const createUser = (newUser) => axios.put(`${url}/create`, newUser)

export const updatePassword = (id, password, oldPassword) => axios.patch(`${url}/updatePassword`, {id, password, oldPassword})

export const updateUsername = (id, username) => axios.patch(`${url}/updateUsername`, {id, username})
