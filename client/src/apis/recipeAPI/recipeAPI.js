import axios from 'axios'
import secureLocalStorage from 'react-secure-storage'
import params from './params.json'

const url = 'https://api.edamam.com/api/recipes/v2?type=public&beta=false'
const appID = params.appID
const appKey = params.appKey

export const getRandomRecipes = (health) => axios.get(`${url}&app_id=${appID}&app_key=${appKey}&random=true${health}`)

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

export const getNextRecipes = (reqUrl) => axios.get(reqUrl)

export const getRecommendedRecipes = () => {
    let reqUrl = `${url}&app_id=${appID}&app_key=${appKey}&random=true`
    let healthLabels = secureLocalStorage.getItem('user').preferences ||[]

    if (healthLabels){
        healthLabels.forEach(tag => reqUrl += `&health=${tag}`)
    }

    let { rating } = secureLocalStorage.getItem('user')

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
