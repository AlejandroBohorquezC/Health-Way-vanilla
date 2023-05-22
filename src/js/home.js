import axios  from "axios";
import { APP_ID, APP_KEY } from "../../config";


const baseUrl = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${APP_ID}&app_key=${APP_KEY}`;

const form = document.querySelector('.form');
const inputText = document.getElementById('input-field');


form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const recipe = inputText.value;

    if (recipe <= 0) {
        return alert('Por favor, ingresa un nombre de comida válido.');
    };

    searchFood(recipe);
});

const searchFood = async (comida) => {
    const {data, ...response} = await axios.get(`${baseUrl}&q=${comida}`);
    if(response.status === 404) {
        return alert('Ha ocurrido un error. Intentar nuevamente.');
    };
    if (data.count === 0) {
        return alert('No se encontraron recetas con el nombre indicado. Intentar otra vez.')
    };
    const {hits} = data;
    const list = document.querySelector('.container');
    
    inputText.value = '';
    list.innerHTML = '';

    const recipes = hits.map(({ recipe }) => {
        const recipeElement = document.createElement('div');
        recipeElement.classList.add('recipe');
        
        const recipeNameElement = document.createElement('p');
        recipeNameElement.classList.add('recipe-name');
        recipeNameElement.textContent = recipe.label;
        
        const recipeImageElement = document.createElement('img');
        recipeImageElement.classList.add('recipe-image');
        recipeImageElement.src = recipe.image;
        
        
        recipeElement.addEventListener('click', () => {
            navigateToRecipeDetails(recipe);
        });
        
        recipeElement.appendChild(recipeNameElement);
        recipeElement.appendChild(recipeImageElement);
        return recipeElement;
    });
    
    list.append(...recipes);
};

const navigateToRecipeDetails = (recipe) => {
    // const recipeLS = JSON.stringify(recipe);
    // localStorage.setItem('recipe', recipeLS);
    window.location.href = `recipe.html`;
    console.log(recipe);
}