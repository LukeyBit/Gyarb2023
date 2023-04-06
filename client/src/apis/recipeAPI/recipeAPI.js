/**
 * @file recipeAPI.js
 * @description This file contains all the functions that make requests to the Edamam API.
 * @author Lukas Andersson, Theo Lindqvist
 * @version 1.0.0
 * 
 * @requires axios
 * @requires react-secure-storage
 * @requires params.json
 * 
 * @exports params
 * @exports getRecipes
 * @exports getNextRecipes
 * @exports getRandomRecipes
 * @exports getRecommendedRecipes
 * 
 * @see {@link https://developer.edamam.com/edamam-docs-recipe-api}
 */
import axios from 'axios'
import secureLocalStorage from 'react-secure-storage'
import params from './params.json'

const url = 'https://api.edamam.com/api/recipes/v2?type=public&beta=false'
const appID = params.appID
const appKey = params.appKey

/**
 * 
 * @param {object} health 
 * @returns {function}
 * 
 * @description This function returns a random recipe from the Edamam API.
 */
export const getRandomRecipes = (health) => axios.get(`${url}&app_id=${appID}&app_key=${appKey}&random=true${health}`)

export const getRecipes = (query) => {
    let reqUrl = `${url}&q=${query}&app_id=${appID}&app_key=${appKey}`

    // Add filters to the request URL if they exist in the sessionStorage
    let filters = JSON.parse(sessionStorage.getItem('filters')) || {}
    if (filters !== {} && filters !== null) {
        Object.keys(filters).forEach((key) => {
            filters[key].forEach((filter) => {
                reqUrl += `&${key}=${filter}`
            })
        })
    }
    return axios.get(reqUrl)
}

/**
 * 
 * @param {string} reqUrl 
 * @returns {function}
 * 
 * @description This function returns the next page of recipes from the Edamam API. The link is provided by the API in the initial request.
 */
export const getNextRecipes = (reqUrl) => axios.get(reqUrl)

/**
 * 
 * @returns {function}
 * 
 * @description This function returns a random recipe from the Edamam API. The recipe is filtered based on the user's preferences and ratings.
 */
export const getRecommendedRecipes = () => {
    let reqUrl = `${url}&app_id=${appID}&app_key=${appKey}&random=true`

    // Get any health labels from the user's preferences in secureLocalStorage
    let healthLabels = secureLocalStorage.getItem('user').preferences ||[]

    // Add health labels to the request URL if they exist in the secureLocalStorage
    if (healthLabels){
        healthLabels.forEach(tag => reqUrl += `&health=${tag}`)
    }

    // Get the user's ratings from secureLocalStorage
    let { rating } = secureLocalStorage.getItem('user')

    // Get all the keys in the rating object.
    // Loop through each key and get the value with the highest number.
    // Get all the keys that have the highest value.
    // Get a random key from the array of keys with the highest value.
    // Replace the word 'Labels' with an empty string in the key.
    // Add the key and value to the request URL.
    Object.keys(rating).forEach((key) => {
        let maxValue = Math.max(...Object.values(rating[key]))
        let maxKeys = Object.keys(rating[key]).filter((k) => rating[key][k] === maxValue)
        let maxKey = maxKeys[Math.floor(Math.random() * maxKeys.length)]
        key = key.replace(/Labels$/, '')
        reqUrl += `&${key}=${maxKey}`
    })
    return axios.get(reqUrl)
}

export { params }
