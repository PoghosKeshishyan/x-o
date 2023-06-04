// Selectors
const game = document.getElementById('game');
const xTurn = document.querySelector('.xTurn');
const oTurn = document.querySelector('.oTurn');

// Variables
const array = [];
const images = ['url(./img/kim1.jpg)', 'url(./img/kim2.jpg)', 'url(./img/kim3.jpg)', 'url(./img/kim4.jpg)', 
                'url(./img/kim5.jpg)', 'url(./img/kim6.jpg)'];
let count = 0;
let step = 'X';
let dataSplit;
let num;

// Prompt
while(true){
    num = +prompt('Enter your number');

    if(num) break;
}

// Functions, EventListeners
document.addEventListener('DOMContentLoaded', () => {    
    xTurn.classList.add('active');
    game.style.background = randomImage(0, images.length);
    game.style.backgroundPosition = 'center';
    game.style.backgroundSize = 'cover'; 
})

for(let i = 0; i < num; i++) {
    array[i] = [];

    for (let j = 0; j < num; j++) {
        array[i][j] = '-';
    }
}

for(let i = 0; i < num; i++) {
    const row = document.createElement('div');
    row.className = 'row';
    row.style.display = 'flex';

    for(let j = 0; j < num; j++) {
        const box = document.createElement('div');
        box.className = 'box';
        box.setAttribute("data-src", `${i}${j}`);
        row.appendChild(box);
    }

    game.appendChild(row);
}

game.addEventListener('click', (e) => {
    if(e.target.classList.contains('box')) {
        if(e.target.innerText) return;

        const audio = document.createElement('audio');
        audio.autoplay = true;
        audio.src = './audio/step.mp3';

        e.target.innerText = step;

        let data = e.target.dataset.src;      
        dataSplit = data.split('');
        array[dataSplit[0]][dataSplit[1]] = step;

        count++;
        if(count == num ** 2){
            return setTimeout(() => alert('Draw'), 100);    
        }
        
        if(test(array)){
            game.style.pointerEvents = 'none';
            return; 
        }

        if(step == 'X'){
            xTurn.classList.remove('active');
            oTurn.classList.add('active');
            step = 'O';
        } else {
            xTurn.classList.add('active');
            oTurn.classList.remove('active');
            step = 'X';
        }
    }
})

function test(array) {
    let bag;

    // ROW
    for(let i = 0; i < array.length; i++) {
        if(array[i].every((el) => el == 'X')) {
            return setTimeout(() => alert('You Winn X'), 100)
        }

        if(array[i].every((el) => el == 'O')) {
            return setTimeout(() => alert('You Winn O'), 100)
        }
    }

    // COL
    for(let i = 0; i < array.length; i++) {
        bag = [];

        for (let j = 0; j < array.length; j++) {
            bag.push(array[j][i]);
        }

        if(bag.every(el => el === 'X')) { 
            return setTimeout(() => alert('You Winn X'), 100)
        }

        if(bag.every(el => el === 'O')) { 
            return setTimeout(() => alert('You Winn O'), 100)
        }
    }

    // GLXAVOR ANKYUNAGIC
    bag = [];

    for(let i = 0; i < array.length; i++) {
        bag.push(array[i][i]);
    }

    if(bag.every(el => el === 'X')) { 
        return setTimeout(() => alert('You Winn X'), 100)
    }

    if(bag.every(el => el === 'O')) { 
        return setTimeout(() => alert('You Winn O'), 100)
    }

    // OJANDAK ANKYUNAGIC 
    bag = [];

    for(let i = 0; i < array.length; i++) {
        bag.push(array[i][array[i].length-i-1]);
    }

    if(bag.every(el => el === 'X')) { 
        return setTimeout(() => alert('You Winn X'), 100)
    }

    if(bag.every(el => el === 'O')) { 
        return setTimeout(() => alert('You Winn O'), 100)
    }
}

// Background
let interval = setInterval(() => {  
    game.style.background = randomImage(0, images.length);
    game.style.backgroundPosition = 'center';
    game.style.backgroundSize = 'cover';    
}, 4000)

function randomImage(min, max) {
    let random = Math.floor(Math.random() * (max - min + 1)) + min;
    return images[random];
}
