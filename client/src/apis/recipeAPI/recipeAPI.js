import axios from 'axios'
import params from './params.json'

const url = 'https://api.edamam.com/api/recipes/v2?type=public&beta=false'
const appID = params.appID
const appKey = params.appKey

export const getRecipes = (query) => {
    let reqUrl = `${url}&q=${query}&app_id=${appID}&app_key=${appKey}`

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

export const getNextRecipes = (url) => axios.get(url)

export const getRecipe = (id) => axios.get(`${url}&r=http://www.edamam.com/ontologies/edamam.owl%23recipe_${id}&app_id=${appID}&app_key=${appKey}`)

export { params }