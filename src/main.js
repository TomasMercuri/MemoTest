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
            bloquearInteraccionUsuario();
            if(cuadrosSonIguales(cuadro, cuadroAnterior)){
                eliminarCuadros(cuadro, cuadroAnterior);
                cuadrosEliminados.push(cuadro, cuadroAnterior);
                setTimeout(jugar, 1000);
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

document.querySelector('#comenzar').addEventListener('click', function(){
    ocultarOpciones();
    mostrarTablero()
    cambiarImagenDelCuadro(retornarOpcion());
    jugar();
});
