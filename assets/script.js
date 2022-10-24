const searchBar = document.querySelector("#searchBar");
const searchBtn = document.querySelector("#searchBtn");
const searchHistory = document.querySelector(".searchHistory");
const mainTemp = document.querySelector(".current #temp")
const mainWind = document.querySelector(".current #wind")
const mainHumidity = document.querySelector(".current #humidity")

const API_KEY = "9d35e655e95e27d60138ab4d4be043b1";
const City = "Denver";
const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${City}&units=imperial&appid=${API_KEY}`;




function searchBtnClick() {
    // What happens when the button is clicked
    searchBtn.addEventListener("click",function (e) {
        displayData()
    });
}

function saveSearchHistory(search) {
    // saves the users input to localStorage
    // TODO: Use Template Literals to display the search history button 
}

function displayData() {
    // displays the weather for the day
    fetch(API_URL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            const temp = (data['main'])['temp'];
            const wind = (data['wind'])['speed']
            const humidity = (data['main'])['humidity']
            mainTemp.textContent += temp
            mainWind.textContent += wind
            mainHumidity.textContent += humidity

             
        })
        .then(function () {
            
        });
     
}

searchBtnClick()