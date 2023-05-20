console.log('Hola');

const btnSubmit = document.querySelector('.submit');

btnSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(e);
    
    console.log('click');
})