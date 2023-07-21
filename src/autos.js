const autos = [
    '../img/autos/auto1.jpg',
    '../img/autos/auto1.jpg',
    '../img/autos/auto2.jpg',
    '../img/autos/auto2.jpg',
    '../img/autos/auto3.jpg',
    '../img/autos/auto3.jpg',
    '../img/autos/auto4.jpg',
    '../img/autos/auto4.jpg',
    '../img/autos/auto5.jpg',
    '../img/autos/auto5.jpg',
    '../img/autos/auto6.jpg',
    '../img/autos/auto6.jpg'
];

function mezclarArray(array){
    return array.sort(() => Math.random() - 0.5);
}

mezclarArray(autos);