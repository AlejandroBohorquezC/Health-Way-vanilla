import axios  from "axios";


const form = document.querySelector('.form');

const baseUrl = 'https://api.edamam.com/api/recipes/v2?type=public&app_id=4fdaa3a2&app_key=09dfc090c8477e00c5957e11c829b34b';


form.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const inputText = document.getElementById('input-field').value;

    if (inputText.trim() === '') {
        alert('Por favor, ingresa un valor válido.');
        return; // Detener la ejecución del evento submit si el campo está vacío
    };
    searchFood(inputText);
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
    const recipes = hits.map(({recipe}) => 
    (`
        <div key="${recipe.label}" class="recipe">    
            <p class="recipe-name">${recipe.label}</p>
            <img class="recipe-image" src='${recipe.image}' />
        </div>
    `))

    list.innerHTML = recipes;
};