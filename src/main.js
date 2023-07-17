function ocultarOpciones(){
    document.querySelector('.opciones').classList.add('visually-hidden');
}



document.querySelector('section button').addEventListener('click', function(){
    ocultarOpciones();
});
