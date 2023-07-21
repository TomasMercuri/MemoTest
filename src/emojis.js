const emojis = [
    '../img/emojis/emoji1.png',
    '../img/emojis/emoji1.png',
    '../img/emojis/emoji2.png',
    '../img/emojis/emoji2.png',
    '../img/emojis/emoji3.png',
    '../img/emojis/emoji3.png',
    '../img/emojis/emoji4.png',
    '../img/emojis/emoji4.png',
    '../img/emojis/emoji5.png',
    '../img/emojis/emoji5.png',
    '../img/emojis/emoji6.png',
    '../img/emojis/emoji6.png'
];

function mezclarArray(array){
    return array.sort(() => Math.random() - 0.5);
}

mezclarArray(emojis);