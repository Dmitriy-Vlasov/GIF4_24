'use strict'


// Значения

const GIF_TODAY_API = 'https://api.giphy.com/v1/gifs/trending';
const GIF_SEARCH_API = 'https://api.giphy.com/v1/gifs/search'
const PROXY = 'https://cors-anywhere.herokuapp.com/';
let limit = 9;

let giftData = [];
let searchData = [];

// Элементы

const root = document.querySelector('#root');
const gifOfDayBlock = document.querySelector('.gifOfDayBlock');
const gifOfDayContent = document.querySelector('.gifOfDayContent');
const gifOfDayTitle = document.querySelector('.gifOfDayTitle');
const gifOfDayLoad = document.querySelector('.gifOfDayLoad');


// Обработчики событий

gifOfDayLoad.addEventListener('click', toLoadGIFofDay);

// Функции

init();

function init(e) {
    fetch(GIF_TODAY_API + `?api_key=A5YsuJEF11jy8mTRK0QXPvwgZ9qyhKPj`)
        .then(resp => resp.json())
        .then(data => giftData = data.data)
        .then(renderGIFtoday)
};

function renderGIFtoday() {
    for(let i = 0; i < limit && i < giftData.length; i++) {
        const gif = document.createElement('a');
        gif.setAttribute('href', `${giftData[i].images.preview_gif.url}`)
        gif.innerHTML = `</h1><span class ="gifItem"; style ="background:url(${giftData[i].images.original.url}) center center no-repeat; background-size: contain;"></span>`;
        gifOfDayContent.append(gif);

        if(i === giftData.length - 1) {
            gifOfDayLoad.textContent = 'THATS ALL';
            gifOfDayLoad.classList.add('non-active')
        }
    }
};

function createHTMLSearch(el) {
    console.log(el.images.original.url);
    const gif = document.createElement('a');
    gif.setAttribute('href', `${el.images.original.url}`)
    gif.innerHTML = `</h1><span class ="gifItem"; style ="background:url(${el.images.original.url}) center center no-repeat; background-size: contain;"></span>`;
    gifOfDayContent.append(gif);
}

function toLoadGIFofDay() {
    clearBoard();
    limit += 9;
    renderGIFtoday();
}

function clearBoard() {
    gifOfDayContent.innerHTML = '';
}