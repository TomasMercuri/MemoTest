function ocultarOpciones(){
    $form.classList.add('visually-hidden');
}

function mostrarTablero(){
    document.querySelector('.juego').classList.remove('visually-hidden');
}

function retornarValorFormulario(){
    return $form.opcion.value;
}

const $form = document.querySelector('.formulario');

document.querySelector('#comenzar').addEventListener('click', function(){
    ocultarOpciones();
    setTimeout(mostrarTablero, 500);
    const opcion = retornarValorFormulario();
    
});
