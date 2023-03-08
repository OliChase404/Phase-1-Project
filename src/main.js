
const BASE_URL = `https://api.edamam.com/api/recipes/v2`
const RAND_RECI_URL = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${R_API_ID}&app_key=${R_API_KEY}&imageSize=LARGE&random=true`

let reciDataArr = []

const reciMenu = document.getElementById('recipeMenu')



//Initialise -----------------------------------------------

fetchRandomRecipes()

//--------------------------------------------------



function toTitleCase(str) {
  return str[0].toUpperCase() + str.slice(1)
  }



// Fetch 20 random recipies and render them to the DOM
function fetchRandomRecipes() {
  fetch(RAND_RECI_URL)
  .then(resp => resp.json())
  .then(data => {
    reciDataArr = data.hits
    console.log(reciDataArr)
    for(obj of reciDataArr){
      renderReciCard(obj)
  }
  })
  .catch(error => console.error(`Fetch Error: ${error}`))
}



// Render one recipe to the DOM
function renderReciCard(reciObj){

  const reciCard = document.createElement('div')

  const reciCardInfo = document.createElement('div')

  const reciImg = document.createElement('img')
  reciImg.src = reciObj.recipe.images.REGULAR.url


  const reciTitle = document.createElement('h2')
  reciTitle.textContent = reciObj.recipe.label

  const reciCardList = document.createElement('ul')
  
  const reciCardListCuType = document.createElement('li')
  reciCardListCuType.textContent = `${toTitleCase(reciObj.recipe.cuisineType[0])} Cuisine`

  const reciCardListDietLab = document.createElement('li')
  reciCardListDietLab.textContent = reciObj.recipe.dietLabels

  const reciCardListHealthLab = document.createElement('li')
  reciCardListHealthLab.textContent = reciObj.recipe.healthLabels[0]

  reciCardList.appendChild(reciCardListCuType)
  reciCardList.appendChild(reciCardListDietLab)
  reciCardList.appendChild(reciCardListHealthLab)


  const reciCardFoot = document.createElement('footer')

  const reciCardFootDishType = document.createElement('span')
  reciCardFootDishType.textContent = toTitleCase(reciObj.recipe.dishType[0])

  const reciCardFootMealType = document.createElement('span')
  reciCardFootMealType.textContent = toTitleCase(reciObj.recipe.mealType[0])

  const reciCardFootPrepTime = document.createElement('span')
  if(reciObj.recipe.totalTime == 0){
    reciCardFootPrepTime.textContent = 'Prep Time: 30 Minutes'
  }else{reciCardFootPrepTime.textContent = `Prep Time: ${reciObj.recipe.totalTime} Minutes`}

  const reciCardFootInfoBtn = document.createElement('button')
  reciCardFootInfoBtn.textContent = ("Click Here for More Info")
  reciCardFootInfoBtn.addEventListener('click',() =>{
    window.open(reciObj.recipe.url)
  })

  reciCardFoot.appendChild(reciCardFootDishType)
  reciCardFoot.appendChild(reciCardFootMealType)
  reciCardFoot.appendChild(reciCardFootPrepTime)
  reciCardFoot.appendChild(reciCardFootInfoBtn)

  reciCardInfo.appendChild(reciCardList)
  reciCardInfo.appendChild(reciCardFoot)
  reciCardInfo.appendChild(reciTitle)


  reciCard.appendChild(reciImg)
  reciCard.appendChild(reciCardInfo)
  // reciCard.appendChild(reciCardList)
  // reciCard.appendChild(reciCardFoot)

  reciCard.classList.add('reciCard')
  reciCardInfo.classList.add('reciCardInfo')

  reciMenu.appendChild(reciCard)
}









