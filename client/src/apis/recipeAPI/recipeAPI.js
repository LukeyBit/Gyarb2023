import axios from 'axios'
import params from './params.json'

const url = 'https://api.edamam.com/api/recipes/v2?type=public&beta=false'
const appID = params.appID
const appKey = params.appKey

export const getRecipes = (query) => {
    console.log(query)
    axios.get(`${url}&q=${query}&app_id=${appID}&app_key=${appKey}`)
        .then(res => {
            console.log(res)
        }
    )
}
