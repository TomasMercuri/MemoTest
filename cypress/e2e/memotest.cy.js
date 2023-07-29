const URL_MEMOTEST = 'https://tomasmercuri.github.io/';
const OCULTO = 'visually-hidden';
const COLORES = '#input-colores';
const EMOJIS = '#input-emojis';
const AUTOS = '#input-autos';

context('Memotest', () => {
    before(() => {
        cy.visit(URL_MEMOTEST);
    });

    describe('Menu del juego.', () => {
        it('Se asegura que el usuario pueda ingresar a las 3 opciones de juego.', () => {
            comenzarJuego(COLORES);
            comprobarFormularioOculto();
            comprobarTableroVisible();

            comenzarJuego(EMOJIS)
            comprobarFormularioOculto();
            comprobarTableroVisible();

            comenzarJuego(AUTOS);
            comprobarFormularioOculto();
            comprobarTableroVisible();
        });
    });

    describe('Juego', () => {
        it('Se asegura que el tablero tenga la cantidad de cuadros correctos.', () => {
            const CANTIDAD_CUADROS = 12;
            comenzarJuego(COLORES);
            cy.get('.juego').find('.cuadros').should('have.length', CANTIDAD_CUADROS);
        });



        it('Se asegura que al tocar un cuadro sea mostrado.', () => {
            comenzarJuego(COLORES);
            cy.get('.cuadro-1').click();
            cy.get('.cuadro-1').should('not.have.class', OCULTO);
        });



        it('Se asegura que al tocar dos cuadros distintos se oculten nuevamente.', () => {
            comenzarJuego(COLORES);
            let cuadrosDistintos = [];

            cy.get('.juego').find('.cuadros').each((cuadro, i) => {
                cy.get(`.cuadro-${i + 1} .parte-trasera img`).then(($img) => {
                    if($img.attr('src') === 'color1.png'){
                        cuadrosDistintos[0] = cuadro;
                    }else if($img.attr('src') === 'color2.png'){
                        cuadrosDistintos[1] = cuadro;
                    }
                });
            });

            cy.get(cuadrosDistintos).each(cuadroDistinto => {
                cy.get(cuadroDistinto).click();
            });

            cy.get(cuadrosDistintos).each(cuadroDistinto => {
                cy.get(`.${cuadroDistinto[0].classList[1]} .parte-trasera`).should('have.class', OCULTO);
            });
        });



        it('Se asegura que los cuadros siempre sean aleatorios', () => {
            comenzarJuego(COLORES);
            let imagenesOriginales = [];

            cy.get('.juego').find('.cuadros').each((cuadro, i) => {
                cy.get(`.cuadro-${i + 1} .parte-trasera img`).then(($img) => {
                    imagenesOriginales.push($img.attr('src'));
                });
            });


            comenzarJuego(COLORES);
            let imagenesNuevas = [];
            cy.get('.juego').find('.cuadros').each((cuadro, i) => {
                cy.get(`.cuadro-${i + 1} .parte-trasera img`).then(($img) => {
                    imagenesNuevas.push($img.attr('src'));
                });
            });

            cy.wrap(imagenesOriginales).should('not.deep.equal', imagenesNuevas);
        });



        it('Se asegura que al tocar dos cuadros iguales se "eliminen" del tablero.', () => {
            comenzarJuego(COLORES);
            let cuadrosIguales = retornarDosCuadrosIguales();

            cy.get(cuadrosIguales).each(cuadroIgual => {
                cy.get(cuadroIgual).click();
            });

            cy.get(cuadrosIguales).each(cuadroIgual => {
                cy.get(`.${cuadroIgual[0].classList[1]} .parte-trasera`).should('have.class', 'cuadro-oculto');
            });
        });

        
    });



    describe('Ganar', () => {
        it('Se asegura de que se pueda ganar el juego', () => {
            comenzarJuego(COLORES);
            ganarJuego();

            cy.get('.juego .cuadros .parte-trasera').each((cuadro) => {
                cy.get(cuadro, { timeout: 10000 }).should('have.class', 'cuadro-oculto');
            });
        });



        it('Se asegura que se muestre el modal', () => {
            comenzarJuego(COLORES);
            ganarJuego();

            cy.get('.modal.fade', { timeout: 10000 }).should('have.class', 'show');
        });



        it('Se asegura que la cantidad de turnos sea correcta', () => {
            const CANTIDAD_TURNOS = 6;
            comenzarJuego(COLORES);
            ganarJuego();

            cy.get('#texto-modal', { timeout: 10000 }).should('have.text', `TARDASTE ${CANTIDAD_TURNOS} TURNOS EN GANAR.`);
        });



        it('Se asegura que se pueda cerrar el modal.', () => {
            comenzarJuego(COLORES);
            ganarJuego();

            cy.get('.modal.fade', { timeout: 10000}).should('have.class', 'show');

            //
            cy.get('#boton-cerrar').click();
            cy.get('#boton-cerrar').click();
            cy.get('#boton-cerrar').click();
            cy.get('#boton-cerrar').click();

            cy.get('.modal.fade', { timeout: 10000}).should('not.have.class', 'show');
            comprobarFormularioVisible();
            comprobarTableroOculto();
        });

        

        it('Se asegura que se pueda reiniciar el juego', () => {
            comenzarJuego(COLORES);
            ganarJuego();

            cy.get('#boton-reiniciar', { timeout: 10000 }).should('be.visible');

            //
            cy.get('#boton-reiniciar').click();
            cy.get('#boton-reiniciar').click();
            cy.get('#boton-reiniciar').click();
            cy.get('#boton-reiniciar').click();

            cy.get('.modal.fade', { timeout: 10000}).should('not.have.class', 'show');
            comprobarFormularioOculto();
            comprobarTableroVisible();
        });


    });

});


// GLOBAL
function comenzarJuego(OPCION){
    cy.visit(URL_MEMOTEST);
    cy.get(OPCION).click();
    cy.get('#comenzar').click();
}


// MENU DEL JUEGO
function comprobarFormularioOculto(){
    cy.get('.formulario').should('have.class', OCULTO);
}

function comprobarTableroVisible(){
    cy.get('.juego').should('not.have.class', OCULTO);
}


// JUEGO
function retornarDosCuadrosIguales(){
    let cuadrosIguales = [];

    cy.get('.juego').find('.cuadros').each((cuadro, i) => {
        cy.get(`.cuadro-${i + 1} .parte-trasera img`).then(($img) => {
            if($img.attr('src') === 'color1.png'){
                cuadrosIguales.push(cuadro[0]);
            }
        });
    });

    return cuadrosIguales;
}



// GANAR
function ganarJuego(){
    clickearCuadros(retornarParesOrdenados());
}

function retornarParesOrdenados(){
    let cuadrosOrdenados = {};
    let paresDeCuadros = [];

    cy.get('.juego').find('.cuadros').each(cuadro =>{
        cy.get(`.${cuadro[0].classList[1]} .parte-trasera img`).then($img => {
            const imagenCuadro = $img.attr('src');
            if(cuadrosOrdenados[imagenCuadro]){
                cuadrosOrdenados[imagenCuadro].push(cuadro[0]);
            }else{
                cuadrosOrdenados[imagenCuadro] = Array.from(cuadro);
            }
        });
    });    

    cy.get(cuadrosOrdenados).each(() => {
        Object.values(cuadrosOrdenados).forEach((cuadro) => {
            paresDeCuadros.push(cuadro);
        });
    });

    return paresDeCuadros;
}

function clickearCuadros(paresDeCuadros) {
    cy.get(paresDeCuadros).each((parDeCuadros, i) => {
        const retrasoClick = (i + 1) * 1100;
        setTimeout(() => {
            parDeCuadros[0].click();
            parDeCuadros[1].click();
        }, retrasoClick);
    });
}

function comprobarFormularioVisible(){
    cy.get('.formulario').should('not.have.class', OCULTO);
}

function comprobarTableroOculto(){
    cy.get('.juego').should('have.class', OCULTO);
}