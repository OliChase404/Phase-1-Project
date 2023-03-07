
const BASE_URL = `https://api.edamam.com/api/recipes/v2`
const RAND_RECI_URL = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${R_API_ID}&app_key=${R_API_KEY}&imageSize=LARGE&random=true`

let reciDataArr = []

fetchRandomRecipes()



     
         function fetchRandomRecipes() {
          fetch(RAND_RECI_URL)
            .then(resp => resp.json())
            .then(data => {
              reciDataArr = data.hits
              console.log(reciDataArr)
            })
            .catch(error => console.error(`Fetch Error: ${error}`))
        }
setTimeout(() => {
    console.log(reciDataArr)
  }, 2000)



