import { R_API_ID, R_API_KEY } from "./secrets.js";



let recipes = []


const API_URL = `https://api.edamam.com/search?q=chicken&app_id=${API_ID}&app_key=${API_KEY}`;

fetch(API_URL)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    // do something with the data
  })
  .catch(error => console.error(`Fetch Error: ${error}`));
