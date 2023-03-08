import axios from 'axios'
import params from './params.json'

const url = 'https://api.edamam.com/api/recipes/v2?type=public&beta=false'
const appID = params.appID
const appKey = params.appKey


export const getNextRecipes = (reqUrl) => axios.get(reqUrl)
export const getRecipes = (query) => axios.get(`${url}&q=${query}&app_id=${appID}&app_key=${appKey}`)
export const getRandomRecipes = (health) => axios.get(`${url}&app_id=${appID}&app_key=${appKey}&random=true${health}`)

export { params }
