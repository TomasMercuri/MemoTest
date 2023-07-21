function ocultarOpciones(){
    $form.classList.add('visually-hidden');
}

function mostrarTablero(){
    document.querySelector('.juego').classList.remove('visually-hidden');
}

function retornarOpcion(){
    let opcionElegida = $form.opcion.value;
    return opcionElegida === 'autos' ? opcionElegida = autos : opcionElegida === 'emojis' ? opcionElegida = emojis : opcion = colores;
}

function mezclarImagenes(imagenes){
    return imagenes.sort(() => Math.random() - 0.5);
}

function cambiarImagenDelCuadro(opcion){
    mezclarImagenes(opcion);
    document.querySelectorAll('.parte-trasera img').forEach(function(img, i){
        img.src = opcion[i];
    });
}


// GANAR
function desocultarCuadros(){
    document.querySelectorAll('.cuadros').forEach(function(cuadro, i){
        cuadro = document.querySelector(`.cuadro-${i + 1} .parte-trasera`);
        cuadro.classList.remove('cuadro-oculto');
        cuadro.classList.add('visually-hidden');
    });
}

function ocultarTablero(){
    document.querySelector('.juego').classList.add('visually-hidden');
}

function reiniciarVariables(){
    contadorClicks = 0;
    cuadroAnterior = '';
    cuadrosEliminados = [];
    contadorTurnos = 0;
}

function mostrarOpciones(){
    $form.classList.remove('visually-hidden');
}

function mostrarTurnosEnElModal(){
    document.querySelector('#texto-modal').textContent = `TARDASTE ${contadorTurnos} TURNOS EN GANAR.`;
}

function mostrarModal(){
    document.querySelector('#boton-modal').click();

    document.querySelector('#boton-cerrar').addEventListener('click', function(){
        reiniciarVariables();
        mostrarOpciones();
    });

    document.querySelector('#boton-reiniciar').addEventListener('click', function(){
        reiniciarVariables();
        mostrarTablero();
        cambiarImagenDelCuadro(retornarOpcion());
        jugar();
    });
}


function ganar(){
    ocultarTablero();
    desocultarCuadros();
    mostrarTurnosEnElModal();
    mostrarModal();
}


// JUGAR
function mostrarImagenDelCuadro(cuadro){
    cuadro.classList.remove('visually-hidden');
}

function ocultarImagenDelCuadro(primerCuadro, segundoCuadro){
    setTimeout(function(){
        primerCuadro.classList.add('visually-hidden');
        segundoCuadro.classList.add('visually-hidden');
    }, 1000);
}

function cuadrosSonIguales(primerCuadro, segundoCuadro){
    return primerCuadro.innerHTML === segundoCuadro.innerHTML;
}

function eliminarCuadros(primerCuadro, segundoCuadro){
    setTimeout(function(){
        primerCuadro.classList.add('cuadro-oculto');
        segundoCuadro.classList.add('cuadro-oculto');
    }, 1000);
}

function bloquearInteraccionUsuario(){
    document.querySelectorAll('.cuadros').forEach(function(cuadro){
        cuadro.onclick = function(){};
    });
}


function interaccionDelUsuario(cuadro){
    if(cuadro !== cuadroAnterior && !cuadrosEliminados.includes(cuadro)){
        contadorClicks++;
        mostrarImagenDelCuadro(cuadro);
        if(contadorClicks % 2 === 0){
            contadorTurnos++;
            bloquearInteraccionUsuario();
            if(cuadrosSonIguales(cuadro, cuadroAnterior)){
                eliminarCuadros(cuadro, cuadroAnterior);
                cuadrosEliminados.push(cuadro, cuadroAnterior);
                cuadrosEliminados.length === 12 ? setTimeout(ganar, 1500) : setTimeout(jugar, 1000);
            }else{
                ocultarImagenDelCuadro(cuadro, cuadroAnterior);
                cuadro = '';
                setTimeout(jugar, 1000);
            }
        }
        cuadroAnterior = cuadro;
    }
}


function jugar(){
    document.querySelectorAll('.cuadros').forEach(function(cuadro, i){
        cuadro.onclick = function(){
            cuadro = document.querySelector(`.cuadro-${i + 1} .parte-trasera`);
            interaccionDelUsuario(cuadro);
        };
    });
}


const $form = document.querySelector('.formulario');
let contadorClicks = 0;
let cuadroAnterior = '';
let cuadrosEliminados = [];
let contadorTurnos = 0;


document.querySelector('#comenzar').addEventListener('click', function(){
    ocultarOpciones();
    mostrarTablero();
    cambiarImagenDelCuadro(retornarOpcion());
    jugar();
});
