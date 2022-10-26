const searchBar = document.querySelector("#searchBar");
const searchBtn = document.querySelector("#searchBtn");
// Display area Selectors ----------------------------------
//Current Day
const displayArea = document.querySelector(".displayArea");
const currentDate = document.querySelector(".current #Date");
const currentTemp = document.querySelector(".current #temp");
const currentWind = document.querySelector(".current #wind");
const currentHumidity = document.querySelector(".current #humidity");
// Search history ------------------------------------------
const searchHistoryBox = document.querySelector(".searchHistory");

const API_KEY = "9d35e655e95e27d60138ab4d4be043b1";
const twhObj = {};


function saveSearchHistory() {
    // saves the users input to localStorage
    // TODO: Use Template Literals to display the search history button 
    localStorage.setItem('search_history',JSON.stringify(searchBar.value));

    // Add the previous search to the DOM
    const historyBtn = `
        <button id="${searchBar.value}">${searchBar.value}</button>
        <style>
            #${searchBar.value} {
                display: flex;
                flex-flow: row;
                justify-content: center;
                margin-top: 10px;
                min-width: 100%  
            }
        </style>
    `;
    searchHistoryBox.innerHTML += historyBtn;
}

async function apiFetch(search) {
    // Added the elements needed to the twhObj
    const API_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${search}&units=imperial&appid=${API_KEY}`;
    await fetch(API_URL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            const date = (data['list']['0']['dt_txt']).substring(0,10);
            const temp = (data['list']['0']['main']['temp']);
            const wind = (data['list']['0']['wind']['speed']);
            const humidity = (data['list']['0']['main']['humidity']);
            Object.assign(twhObj,{ date1: date });
            Object.assign(twhObj,{ temp1: temp });
            Object.assign(twhObj,{ wind1: wind });
            Object.assign(twhObj,{ humidity1: humidity });
            displayWether();
            saveSearchHistory();
        });
}

function displayWether() {
    // Displays the whether card to the page
    currentDate.textContent += `${searchBar.value} (${twhObj.date1})`;
    currentTemp.textContent += `Temp: ${twhObj.temp1} °F`;
    currentWind.textContent += `Wind: ${twhObj.wind1} MPH`;
    currentHumidity.textContent += `Humidity: ${twhObj.humidity1}%`;
}

searchBtn.addEventListener("click",function (e) {
    // Called when the search button is clicked
    currentDate.textContent = "";
    currentTemp.textContent = "";
    currentWind.textContent = "";
    currentHumidity.textContent = "";
    apiFetch(searchBar.value);
});
