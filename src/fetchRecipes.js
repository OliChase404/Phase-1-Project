import { R_API_ID, R_API_KEY } from "./secrets.js"

const BASE_URL = `https://api.edamam.com/api/recipes/v2`

const RAND_RECI_URL = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${R_API_ID}&app_key=${R_API_KEY}&imageSize=LARGE&random=true`


// `https://api.edamam.com/search?q=chicken&app_id=${R_API_ID}&app_key=${R_API_KEY}`

let recipes = []

export function fetchRandomRecipes(){ 
   fetch(RAND_RECI_URL)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      let reciDataArr = data
      for(obj of reciDataArr){
        renderRecipeCard(obj)
      }

    })
    .catch(error => console.error(`Fetch Error: ${error}`))
  }



  