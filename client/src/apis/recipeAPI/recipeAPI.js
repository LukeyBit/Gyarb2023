import axios from 'axios'
import params from './params.json'

const url = 'https://api.edamam.com/api/recipes/v2?type=public&beta=false'
const appID = params.appID
const appKey = params.appKey

export const getRecipes = (query) => {
    // let fields = ''
    // params.fields.forEach((field) => {
    //     fields += `&field=${field}`
    // })

    let reqUrl = `${url}&q=${query}&app_id=${appID}&app_key=${appKey}`
    let filters = JSON.parse(sessionStorage.getItem('filters'))

    Object.keys(filters).forEach((key) => {
        filters[key].forEach((filter) => {
            reqUrl += `&${key}=${filter}`
        })
    })

    return axios.get(reqUrl)
}

export const getRecipe = (id) => axios.get(`${url}&r=http://www.edamam.com/ontologies/edamam.owl%23recipe_${id}&app_id=${appID}&app_key=${appKey}`)

export { params }