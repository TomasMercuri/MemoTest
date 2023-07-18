function ocultarOpciones(){
    $form.classList.add('visually-hidden');
}

function mostrarTablero(){
    document.querySelector('.juego').classList.remove('visually-hidden');
}

function retornarOpcion(){
    return $form.opcion.value;
}

function cambiarImagenDelCuadro(opcion){
    opcion === 'autos' ? opcion = autos : opcion === 'emojis' ? opcion = emojis : opcion = colores;
    document.querySelectorAll('.parte-trasera img').forEach(function(img, i){
        img.src = opcion[i];
    });
}

function ocultarParteDelantera(i){
    document.querySelector(`.cuadro-${i} .parte-delantera`).classList.add('visually-hidden');
}

function mostrarParteTrasera(i){
    document.querySelector(`.cuadro-${i} .parte-trasera`).classList.remove('visually-hidden');
}

function comprobarCuadrosIguales(cuadroActual, cuadroAnterior){
    return cuadroActual === cuadroAnterior;
}


function comenzarJuego(){
    let cuadroAnterior = 0;
    document.querySelectorAll('.cuadros').forEach(function(cuadro, i){
        cuadro.addEventListener('click', function(){
            const cuadroActual = document.querySelector(`.cuadro-${i + 1} .parte-trasera img`).src;
            ocultarParteDelantera(i + 1);
            mostrarParteTrasera(i + 1);
            comprobarCuadrosIguales(cuadroActual, cuadroAnterior)
            cuadroAnterior = cuadroActual;
        });
    });
}




const $form = document.querySelector('.formulario');

document.querySelector('#comenzar').addEventListener('click', function(){
    ocultarOpciones();
    mostrarTablero()
    cambiarImagenDelCuadro(retornarOpcion());
    comenzarJuego();
});
