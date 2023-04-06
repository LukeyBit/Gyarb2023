/**
 * @file userAPI.js
 * @description This file contains all the functions that make requests to the user API.
 * @author Lukas Andersson, Theo Lindqvist
 * @version 1.0.0
 * 
 * @requires axios
 * 
 * @exports loginUser
 * @exports createUser
 * @exports updatePassword
 * @exports updateUsername
 * @exports updateTags
 * @exports updateRating
 */
import axios from 'axios'

const url = "http://localhost:5000/user"

/**
 * 
 * @param {object} credentials 
 * @returns {function}
 * 
 * @description This function is used to login a user
 */
export const loginUser = (credentials) => axios.post(`${url}/login`, credentials)

/**
 * 
 * @param {object} newUser 
 * @returns {function}
 * 
 * @description This function is used to create a new user
 */
export const createUser = (newUser) => axios.put(`${url}/create`, newUser)

/**
 * 
 * @param {int} id 
 * @param {string} password 
 * @param {string} oldPassword 
 * @param {object} token object
 * @returns {function}
 */
export const updatePassword = (id, password, oldPassword, token) => {
  let config = {
    headers: {
      "x-access-token": token,
    },
  }
  return axios.patch(`${url}/updatePassword`, { id, password, oldPassword }, config
  )
}

/**
 * 
 * @param {int} id 
 * @param {string} username 
 * @param {object} token object
 * @returns {function}
 */
export const updateUsername = (id, username, token) => {
  let config = {
    headers: {
      "x-access-token": token,
    },
  }
  return axios.patch(`${url}/updateUsername`, { id, username }, config)
}

/**
 * 
 * @param {int} id 
 * @param {object} tags 
 * @param {object} token object
 * @returns {function}
 * 
 * @description This function is used to update the tags of a user
 */
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