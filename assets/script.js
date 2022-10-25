const searchBar = document.querySelector("#searchBar");
const searchBtn = document.querySelector("#searchBtn");
const searchHistory = document.querySelector(".searchHistory");
const displayArea = document.querySelector(".displayArea");


const API_KEY = "9d35e655e95e27d60138ab4d4be043b1";
const twhObj = {};


function saveSearchHistory(search) {
    // saves the users input to localStorage
    // TODO: Use Template Literals to display the search history button 
}

function apiFetch(search) {
    // Added the elements needed to the twhObj
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=imperial&appid=${API_KEY}`;
    fetch(API_URL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            const temp = (data['main'])['temp'];
            const wind = (data['wind'])['speed'];
            const humidity = (data['main'])['humidity'];
            Object.assign(twhObj,{ temp1: temp });
            Object.assign(twhObj,{ wind1: wind });
            Object.assign(twhObj,{ humidity1: humidity });
        });
}

function displayWether() {
    // Displays the whether card to the page
    const wetherToday = document.createElement('div');
    wetherToday.id = "current";
    var new_ = wetherToday.innerHTML = `
        <h2 id="Date"></h2>
        <h3 id="temp">Temp: ${twhObj[temp1]}°F</h3>
        <h3 id="wind">Wind: ${twhObj[wind1]} MPH</h3>
        <h3 id="humidity">Humidity: ${twhObj[humidity1]}%</h3>
        <div class="searchHistory"></div>
    `;
    console.log(new_);
}

searchBtn.addEventListener("click",function (e) {
    // Called when the search button is clicked
    apiFetch(searchBar.value);
    //displayWether();
    console.log(twhObj['temp1'])
});
