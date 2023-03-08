
const BASE_URL = `https://api.edamam.com/api/recipes/v2`
const RAND_RECI_URL = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${R_API_ID}&app_key=${R_API_KEY}&imageSize=LARGE&random=true`

const searchForm = document.getElementById('searchForm')
const reciMenu = document.getElementById('recipeMenu')
const filterSideBar = document.getElementById('filterSideBar')

const cuisineTypeArr = ['American', 'Asian', 'British', 'Caribbean', 'Central Europe', 'Chinese', 'Eastern Europe', 'French', 'Indian', 'Italian', 'Japanese', 'Kosher', 'Mediterranean', 'Mexican', 'Middle Eastern', 'Nordic', 'South American', 'South East Asian']
const mealTypeArr = ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Teatime']
const dishTypeArr = ['Biscuits and cookies', 'Bread', 'Cereals', 'Condiments and sauces', 'Desserts', 'Drinks', 'Main course', 'Pancake', 'Preps', 'Preserve', 'Salad', 'Sandwiches', 'Side dish', 'Soup', 'Starter', 'Sweets']
const healthLabelArr = ['alcohol-cocktail', 'alcohol-free', 'dairy-free', 'egg-free', 'fish-free', 'gluten-free', 'keto-friendly', 'kosher', 'low-potassium', 'low-sugar', 'paleo', 'peanut-free', 'pescatarian', 'pork-free', 'red-meat-free', 'shellfish-free', 'soy-free', 'tree-nut-free', 'vegan', 'vegetarian']
const dietLabelArr = ['balanced', 'high-fiber', 'high-protein', 'low-carb', 'low-fat', 'low-sodium']
const searchValues = {}

let reciDataArr = []

//Initialise -----------------------------------------------

fetchRandomRecipes()

renderSearchFilterListToSideBar(cuisineTypeArr, 'Cuisine Type')
renderSearchFilterListToSideBar(mealTypeArr, 'Meal Type')
renderSearchFilterListToSideBar(dishTypeArr, 'Dish Type')
renderSearchFilterListToSideBar(healthLabelArr, 'Health Labels')
renderSearchFilterListToSideBar(dietLabelArr, 'Diet Labels')


//--------------------------------------------------

//----------------------------------------------------
searchForm.addEventListener('submit', (event)=> {
  event.preventDefault()
  fetchReciSearch()
})
//---------------------------------------

// Fetch 20 random recipies and render them to the DOM ---------------------------------
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
//---------------------------------------------------

//-----------------------------------------------------------
function capFirstChar(str) {
  return str[0].toUpperCase() + str.slice(1)
  }
//-------------------------------------------------

//-----------------------------------------------------------------
function sortSearchTermsByType(arr1, arr2, arr3){
  for (let i = 0; i < arr1.length; i++) {
    if (arr2.includes(arr1[i])) {
      arr3.push(arr1[i])
    }
  }
}
//---------------------------------------------

//-----------------------------------------------------
function clearRecipes(){
  reciMenu.innerHTML = ''
}
//---------------------------------------------------

// Run Search with user specified parameters -------------------------------------------------
function fetchReciSearch(){
  let searchURL = `${BASE_URL}?type=public&beta=false`
  // Add all selcted search filter options to an array
  const specifiedSearchTerms = []
  for (const key in searchValues) {
    if (searchValues.hasOwnProperty(key) && searchValues[key]) {
      specifiedSearchTerms.push(key)
    }
  }
  // Sort filter options by type and add to seperate arrays
  const cuisineTypeSearchTerms = []
  sortSearchTermsByType(specifiedSearchTerms, cuisineTypeArr, cuisineTypeSearchTerms)
  const mealTypeSearchTerms = []
  sortSearchTermsByType(specifiedSearchTerms, mealTypeArr, mealTypeSearchTerms)
  let dishTypeSearchTerms = []
  sortSearchTermsByType(specifiedSearchTerms, dishTypeArr, dishTypeSearchTerms)
  const healthLabelSearchTerms = []
  sortSearchTermsByType(specifiedSearchTerms, healthLabelArr,healthLabelSearchTerms)
  const dietLabelSearchTerms = []
  sortSearchTermsByType(specifiedSearchTerms, dietLabelArr, dietLabelSearchTerms)
  // map dishTypeSearchTerms to replace all the spaces with %20
  dishTypeSearchTerms = dishTypeSearchTerms.map((str) => {
    return str.replace(/\s/g, '%20');
  });
  // If a search query is spcified, add it to the URL
  if(searchForm[0].value !== ''){
    searchURL += `&q=${searchForm[0].value}`
  }
  // Add API ID and Key to URL
  searchURL += `&app_id=${R_API_ID}&app_key=${R_API_KEY}%20%09`
  // Add diet labels if present
  if(dietLabelSearchTerms !== []){
    for(let ele of dietLabelSearchTerms){
      searchURL += `&diet=${ele}`
    }
  }
  // Add health labels if present
  if(healthLabelSearchTerms !== []){
    for(let ele of healthLabelSearchTerms){
      searchURL += `&health=${ele}`
    }
  }
  // Add cuisine type labels if present
  if(cuisineTypeSearchTerms !== []){
    for(let ele of cuisineTypeSearchTerms){
      searchURL += `&cuisineType=${ele}`
    }
  }
  // Add meal type labels if present
  if(mealTypeSearchTerms !== []){
    for(let ele of mealTypeSearchTerms){
      searchURL += `&mealType=${ele}`
    }
  }
  // Add dish type labels if present
  if(dishTypeSearchTerms !== []){
    for(let ele of dishTypeSearchTerms){
      searchURL += `&dishType=${ele}`
    }
  }
// Fetch with searchURL
fetch(searchURL)
.then(resp => resp.json())
.then(data => {
  reciDataArr = data.hits
  clearRecipes()
  for(obj of reciDataArr){
    renderReciCard(obj)
  }
})
.catch(error => console.error(`Fetch Error: ${error}`))
}
//-------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------
function renderSearchFilterListToSideBar(typeArr, listTitle){
  const typeList = document.createElement('ul')
  const listHeading = document.createElement('h3')
  listHeading.textContent = listTitle
  listHeading.classList.add('filterListHeading')
  typeList.appendChild(listHeading)
  for(let ele of typeArr){
    searchValues[ele] = false
    const listItem = document.createElement('li')
    listItem.textContent = ele
    listItem.addEventListener('click', () => {
      if(searchValues[ele]){
        listItem.style.color = 'white'
        listItem.style.border = ''
        searchValues[ele] = false
      } else {
        listItem.style.color = 'hotpink'
        listItem.style.border = '2px solid hotpink'
        searchValues[ele] = true
      }
      console.log(searchValues)
    })
    listItem.classList.add('searchFilterListItem')
    typeList.appendChild(listItem)
  }
  typeList.classList.add('searchFilterLists')
  filterSideBar.appendChild(typeList)
}
//-----------------------------------------------------------------------

// Render one recipe to the DOM ------------------------------------------------
function renderReciCard(reciObj){

  const reciCard = document.createElement('div')
  reciCard.addEventListener('mouseover',()=> {
    reciCard.style.border = '5px solid hotpink'
  })
  reciCard.addEventListener('mouseout', ()=> {
    reciCard.style.border = '3px solid rgba(255, 255, 255, 0.856)'
  })


  const reciCardInfo = document.createElement('div')

  const reciImg = document.createElement('img')
  reciImg.src = reciObj.recipe.images.REGULAR.url


  const reciTitle = document.createElement('h2')
  reciTitle.textContent = reciObj.recipe.label

  const reciCardList = document.createElement('ul')
  
  const reciCardListCuType = document.createElement('li')
  reciCardListCuType.textContent = `${capFirstChar(reciObj.recipe.cuisineType[0])} Cuisine`

  const reciCardListDietLab = document.createElement('li')
  reciCardListDietLab.textContent = reciObj.recipe.dietLabels

  const reciCardListHealthLab = document.createElement('li')
  reciCardListHealthLab.textContent = reciObj.recipe.healthLabels[0]

  reciCardList.appendChild(reciCardListCuType)
  reciCardList.appendChild(reciCardListDietLab)
  reciCardList.appendChild(reciCardListHealthLab)


  const reciCardFoot = document.createElement('footer')

  const reciCardFootDishType = document.createElement('span')
  reciCardFootDishType.textContent = capFirstChar(reciObj.recipe.dishType[0])

  const reciCardFootMealType = document.createElement('span')
  reciCardFootMealType.textContent = capFirstChar(reciObj.recipe.mealType[0])

  const reciCardFootPrepTime = document.createElement('span')
  if(reciObj.recipe.totalTime == 0){
    reciCardFootPrepTime.textContent = 'Prep Time: 30 Minutes'
  }else{reciCardFootPrepTime.textContent = `Prep Time: ${reciObj.recipe.totalTime} Minutes`}

  // const reciCardFootInfoBtn = document.createElement('button')
  // reciCardFootInfoBtn.textContent = ("Click Here for More Info")
  // reciCardFootInfoBtn.addEventListener('click',() =>{
  //   window.open(reciObj.recipe.url)
  // })

  reciCardFoot.appendChild(reciCardFootDishType)
  reciCardFoot.appendChild(reciCardFootMealType)
  reciCardFoot.appendChild(reciCardFootPrepTime)
  // reciCardFoot.appendChild(reciCardFootInfoBtn)

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
//--------------------------------------------------------------------









