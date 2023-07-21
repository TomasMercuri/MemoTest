const colores = [
    '../img/colores/color1.png',
    '../img/colores/color1.png',
    '../img/colores/color2.png',
    '../img/colores/color2.png',
    '../img/colores/color3.png',
    '../img/colores/color3.png',
    '../img/colores/color4.png',
    '../img/colores/color4.png',
    '../img/colores/color5.png',
    '../img/colores/color5.png',
    '../img/colores/color6.png',
    '../img/colores/color6.png',
];

function mezclarArray(array){
    return array.sort(() => Math.random() - 0.5);
}

mezclarArray(colores);