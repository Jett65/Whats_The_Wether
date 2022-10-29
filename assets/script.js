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

function displayHistory() {
    // Displays the search history when the page lodes
    const stored = localStorage.getItem("search-history")
    const list = []
    if (stored) {
        for (i = 0; i < JSON.parse(stored).length; i++) {
            // addToDOM(localStorage.getItem("search-history", JSON.parse(i)))
            list.push(localStorage.getItem("search-history", JSON.parse(i)))
        }
    }
    console.log(list)
}

function addToDOM(text) {
    // Creates the search history buttons 
    const historyBtn = document.createElement("button");
    historyBtn.innerText = text;

    // Aloes the button to be clicked
    historyBtn.addEventListener('click',function (e) {
        text = historyBtn.innerText;
        searchBtn.click();
    });
    searchHistoryBox.append(historyBtn);
}

function saveSearchHistory() {
    // Saves searched to local storage
    if (localStorage.getItem("search-history") === null) {
        localStorage.setItem("search-history","[]");
    }
    if (localStorage.getItem("search-history").includes(searchBar.value.toLowerCase())) {

    } else {
        const old_search = JSON.parse(localStorage.getItem("search-history"));
        old_search.push(searchBar.value.toLowerCase());
        localStorage.setItem("search-history",JSON.stringify(old_search));
        addToDOM(searchBar.value);
    }
    

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

displayHistory();

searchBtn.addEventListener("click",function (e) {
    // Called when the search button is clicked
    currentDate.textContent = "";
    currentTemp.textContent = "";
    currentWind.textContent = "";
    currentHumidity.textContent = "";
    //searchBar.value = "Denver";
    apiFetch(searchBar.value);
});

// TODO: loop throw storage and display the buttons
// TODO: Icons
