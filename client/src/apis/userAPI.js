import axios from "axios"

const url = "http://localhost:5000/user"

export const loginUser = (credentials) =>
  axios.post(`${url}/login`, credentials)

export const createUser = (newUser) => axios.put(`${url}/create`, newUser)

export const updatePassword = (id, password, oldPassword, token) => {
  let config = {
    headers: {
      "x-access-token": token,
    },
  }
  return axios.patch(`${url}/updatePassword`, { id, password, oldPassword }, config
  )
}

export const updateUsername = (id, username, token) => {
  let config = {
    headers: {
      "x-access-token": token,
    },
  }
  return axios.patch(`${url}/updateUsername`, { id, username }, config)
}

export const updateTags = (id, tags, token) => {
  let config = {
    headers: {
      "x-access-token": token,
    },
  }
  return axios.patch(`${url}/updateTags`, { id, tags }, config)
}

export const updateRating = (id, rating, token) => {
  let config = {
    headers: {
      "x-access-token": token,
    },
  }
  return axios.patch(`${url}/updateRating`, { id, rating }, config)
}