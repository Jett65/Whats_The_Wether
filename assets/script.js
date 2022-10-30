const searchBar = document.querySelector("#searchBar");
const searchBtn = document.querySelector("#searchBtn");
// Display area Selectors ----------------------------------
const displayArea = document.querySelector(".displayArea");
//Current Day
const currentDate = document.querySelector(".day1 #date");
const currentTemp = document.querySelector(".day1 #temp");
const currentWind = document.querySelector(".day1 #wind");
const currentHumidity = document.querySelector(".day1 #humidity");
const currenticon = document.querySelector(".day1 #icon");
//Day2
const dayTwoDate = document.querySelector(".day2 #date");
const dayTwoTemp = document.querySelector(".day2 #temp");
const dayTwoWind = document.querySelector(".day2 #wind");
const dayTwoHumidity = document.querySelector(".day2 #humidity");
const dayTwoicon = document.querySelector(".day2 #icon");
//Day3
const dayThreeDate = document.querySelector(".day3 #date");
const dayThreeTemp = document.querySelector(".day3 #temp");
const dayThreeWind = document.querySelector(".day3 #wind");
const dayThreeHumidity = document.querySelector(".day3 #humidity");
const dayThreeicon = document.querySelector(".day3 #icon");
//Day4
const dayFourDate = document.querySelector(".day4 #date");
const dayFourTemp = document.querySelector(".day4 #temp");
const dayFourWind = document.querySelector(".day4 #wind");
const dayFourHumidity = document.querySelector(".day4 #humidity");
const dayFouricon = document.querySelector(".day4 #icon");
//Day5
const dayFiveDate = document.querySelector(".day5 #date");
const dayFiveTemp = document.querySelector(".day5 #temp");
const dayFiveWind = document.querySelector(".day5 #wind");
const dayFiveHumidity = document.querySelector(".day5 #humidity");
const dayFiveicon = document.querySelector(".day5 #icon");
//Day6
const daySixDate = document.querySelector(".day6 #date");
const daySixTemp = document.querySelector(".day6 #temp");
const daySixWind = document.querySelector(".day6 #wind");
const daySixHumidity = document.querySelector(".day6 #humidity");
const daySixicon = document.querySelector(".day6 #icon");
// Search history ------------------------------------------
const searchHistoryBox = document.querySelector(".searchHistory");


function displayHistory() {
    // Displays the search history when the page lodes
    const stored = localStorage.getItem("search-history");
    if (stored) {
        const arrayStored = Array.from(JSON.parse(stored));
        for (i = 0; i < arrayStored.length; i++) {
            addToDOM(arrayStored[i]);
        }
    }
}

function addToDOM(text) {
    // Creates the search history buttons 
    const historyBtn = document.createElement("button");

    // Button styling
    historyBtn.innerText = text;
    historyBtn.style.display = "flex";
    historyBtn.style.minWidth = "100%";
    historyBtn.style.justifyContent = "center";
    historyBtn.style.marginTop = "10px";
    historyBtn.style.fontWeight = "bold";
    historyBtn.style.backgroundColor = "lightgray";


    // Aloes the button to be clicked
    historyBtn.addEventListener('click',function (e) {
        searchBar.value = historyBtn.innerText;
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

function displayWether(data,index,day) {
    // Displays the whether card to the page
    const twhObj = {};
    const dayDate = document.querySelector(`.${day} #date`);
    const dayTemp = document.querySelector(`.${day} #temp`);
    const dayWind = document.querySelector(`.${day} #wind`);
    const dayHumidity = document.querySelector(`.${day} #humidity`);
    const dayIcon = document.querySelector(`.${day} #icon`)
    const date = (data['list'][`${index}`]['dt_txt']).substring(0,10);
    const temp = (data['list'][`${index}`]['main']['temp']);
    const wind = (data['list'][`${index}`]['wind']['speed']);
    const humidity = (data['list'][`${index}`]['main']['humidity']);
    const geticon = (data['list'][`${index}`]['weather']['icon']);
    Object.assign(twhObj,{ date1: date });
    Object.assign(twhObj,{ temp1: temp });
    Object.assign(twhObj,{ wind1: wind });
    Object.assign(twhObj,{ humidity1: humidity });
    if (day === "day1") {
        dayDate.textContent += `${searchBar.value} (${twhObj.date1})`;
    } else {
        dayDate.textContent += `${twhObj.date1}`;
    }

    const icon = document.createElement("img")
    icon.src = `http://openweathermap.org/img/wn/${geticon}@2x.png`
    dayIcon.appendChild(icon)
    dayTemp.textContent += `Temp: ${twhObj.temp1} °F`;
    dayWind.textContent += `Wind: ${twhObj.wind1} MPH`;
    dayHumidity.textContent += `Humidity: ${twhObj.humidity1}%`;
    console.log(data['weather']);
}

async function apiFetch(search) {
    // Added the elements needed to the twhObj
    const API_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${search}&units=imperial&appid=9d35e655e95e27d60138ab4d4be043b1`;
    await fetch(API_URL)
        .then(function (response) {
            console.log()
            return response.json();
        })
        .then(function (data) {
            displayWether(data,0,"day1");
            displayWether(data,7,"day2");
            displayWether(data,19,"day3");
            displayWether(data,25,"day4");
            displayWether(data,31,"day5");
            displayWether(data,39,"day6");
            saveSearchHistory();

        });
}

displayHistory();

searchBtn.addEventListener("click",function (e) {
    //Called when the search button is clicked
    //clears the text
    currentDate.textContent = "";
    currentTemp.textContent = "";
    currentWind.textContent = "";
    currentHumidity.textContent = "";
    currenticon.textContent = ""
    dayTwoDate.textContent = "";
    dayTwoTemp.textContent = "";
    dayTwoWind.textContent = "";
    dayTwoHumidity.textContent = "";
    dayTwoicon.textContent = ""
    dayThreeDate.textContent = "";
    dayThreeTemp.textContent = "";
    dayThreeWind.textContent = "";
    dayThreeHumidity.textContent = "";
    dayThreeicon.textContent = ""
    dayFourDate.textContent = "";
    dayFourTemp.textContent = "";
    dayFourWind.textContent = "";
    dayFourHumidity.textContent = "";
    dayFouricon.textContent = ""
    dayFiveDate.textContent = "";
    dayFiveTemp.textContent = "";
    dayFiveWind.textContent = "";
    dayFiveHumidity.textContent = "";
    dayFiveicon.textContent = ""
    daySixDate.textContent = "";
    daySixTemp.textContent = "";
    daySixWind.textContent = "";
    daySixHumidity.textContent = "";
    daySixicon.textContent = ""

    apiFetch(searchBar.value);
});