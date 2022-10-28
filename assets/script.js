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

function addToDOM() {
    // Creates the search history buttons 
    const historyBtn = document.createElement("hutton");
    historyBtn.innerText = searchBar.value;

    // Aloes the button to be clicked
    historyBtn.addEventListener('click',function (e) {
        searchBar.value = historyBtn.innerText;
        apiFetch(searchBar.value);
        //searchBtn.click()
    });

}

function saveSearchHistory() {
    // saves the users input to localStorage
    // const saveObj = {};
    // const save = localStorage.getItem("search_history");

    // // Checks is the save is in local storage
    // if (save) {
    //     // checks if teh input is in the local storage
    //     // TODO: Review to make better
    //     if (localStorage.getItem("search_history").includes(searchBar.value)) {
    //     } else {

    //         localStorage.setItem("search_history",JSON.stringify());
    //         addToDOM();
    //     }
    // } else {
    //     localStorage.setItem("search_history",JSON.stringify());
    //     addToDOM();
    // }

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
            addToDOM();
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
    //searchBar.value = "Denver";
    apiFetch(searchBar.value);
});


// TODO: Find out why the history buttons wont display