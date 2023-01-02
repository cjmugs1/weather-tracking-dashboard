// || GLOBAL VARIABLES FOR API SEARCHES

// MY API KEY: a4b9474ba2b20171d99cdb82d09fd3b2
const apiKey = "&appid=a4b9474ba2b20171d99cdb82d09fd3b2"
// US Country code is 840, or USA, or US
const countryCode = "US"
// MORE PARAMETERS
const apiLimit1 = "&limit=1"
const apiLimit5 = "&limit=5"
const weatherUnits = "&units=imperial"

// SEARCH FOR WEATHER
// https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&appid={API key}
const weatherApi = "https://api.openweathermap.org/data/3.0/onecall?"

// FIND LAT AND LON BY CITY NAME OR BY ZIPCODE


// BY CITY NAME
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
const geoApiCity = "http://api.openweathermap.org/geo/1.0/direct?q="

// BY ZIP CODE
// http://api.openweathermap.org/geo/1.0/zip?zip={zip code},{country code}&appid={API key}
const geoApiZip = "http://api.openweathermap.org/geo/1.0/zip?zip="



// || DYNAMIC CREATION OF DOM ELEMENTS ON LOAD


// CREATE POPULAR CITY SEARCH BUTTONS
createPopularCitiesBtns = () => {
    const popularCitiesBtnContainer = $('.popular-cities-btn-container')
    const popularCities = [
    {city: "Atlanta", stateCode: "GA"},
    {city: "Boston", stateCode: "MA"},
    {city: "Chicago", stateCode: "IL"},
    {city: "Dallas", stateCode: "TX"},
    {city: "Denver", stateCode: "CO"},
    {city: "Los Angeles", stateCode: "CA"},
    {city: "Miami", stateCode: "FL"},
    {city: "New York", stateCode: "NY"},
    {city: "Seattle", stateCode: "WA"},
    {city: "Washington D.C.", stateCode: "DC"},
    ]

    popularCities.forEach((popularCity) => {
        let popularCitiesBtn = $('<button class="btn text-nowrap popular-city-btn" onclick="searchPopularCity(event)"></button>')
        $(popularCitiesBtn).text(popularCity.city);
        $(popularCitiesBtn).attr("data-state-code", popularCity.stateCode)
        popularCitiesBtnContainer.append(popularCitiesBtn)
    });
}
createPopularCitiesBtns();



// || API CALL HELPER FUNCTIONS

// GET COORDINATES BY CITY NAME
function fetchCoordinatesByPopularCity (cityName, stateCode) {
    return fetch(`${geoApiCity}${cityName},${stateCode},${countryCode}${apiLimit1}${apiKey}`)
        .then((data) => data.json())
        .then(function (results) {
            console.log(results)
            let searchCoordinates = [results[0].lat, results[0].lon];
            return searchCoordinates;
        });
}

function fetchCoordinatesByCity (cityName) {
    return fetch(`${geoApiCity}${cityName},${countryCode}${apiLimit5}${apiKey}`)
        .then((data) => data.json())
        .then(function (results) {
            console.log(results)
            $('.searched-city').text(results[0].name)
            let searchCoordinates = [results[0].lat, results[0].lon];
            return searchCoordinates;
        });
}

// GET COORDINATES BY ZIP CODE
function fetchCoordinatesByZip (zipcode){
    return fetch(`${geoApiZip}${zipcode},${countryCode}${apiKey}`)
        .then((data) => data.json())
        .then(function (results) {
            $('.searched-city').text(results.name)
            console.log(results)
            let searchCoordinates = [results.lat, results.lon];
            return searchCoordinates;
        });
}

// GET WEATHER DATA USING COORDINATES
function searchWeatherByCoordinates (searchCoordinates) {
    return fetch (`${weatherApi}lat=${searchCoordinates[0]}&lon=${searchCoordinates[1]}${weatherUnits}${apiKey}`)
        .then((data) => data.json())
        .then(function (results){
            let weatherSearchResults = results
            console.log(weatherSearchResults);
            return weatherSearchResults;
        })
}



//  || MAIN HANDLE ON CLICK FUNCTIONS (ON CLICK OF POPULAR CITIES, or BY SEARCH BAR)

// HANDLE ON CLICK EVENT FOR POPULAR CITY BUTTONS (searchPopularCity is added in dynamically
// as an onclick listener to the Button in the createPopularCitiesBtns function)
function searchPopularCity(event) {
    event.preventDefault();
    let selectedPopularCity = event.target
    let cityName = $(selectedPopularCity).text()
    // Set name of searched city
    $('.searched-city').text(cityName)
    let stateCode = $(selectedPopularCity).attr('data-state-code')
    fetchCoordinatesByPopularCity(cityName, stateCode)
        .then((searchCoordinates) => searchWeatherByCoordinates(searchCoordinates)
        .then((weatherSearchResults) => createSearchResults(weatherSearchResults)
        ));
}

// SEARCH BY USER INPUT CITY OR ZIPCODE IN THE SEARCH BAR (Is called on enter press on search input,  or search button click)
function searchByCityOrZip (searchValue){
    if (Number.isNaN(parseInt(searchValue))) {
        fetchCoordinatesByCity(searchValue.trim())
            .then((searchCoordinates) => searchWeatherByCoordinates(searchCoordinates)
            .then((weatherSearchResults) => createSearchResults(weatherSearchResults)
            ));
    } else if (searchValue.toString().length < 5 || searchValue.toString().length > 5) {
        window.alert('Please enter a 5 digit ZipCode!')
    } else {
        fetchCoordinatesByZip(searchValue.trim())
            .then((searchCoordinates) => searchWeatherByCoordinates(searchCoordinates)
            .then((weatherSearchResults) => createSearchResults(weatherSearchResults)
            ));
    };
}

// ON ENTER PRESS IN SEARCH INPUT
$('.search-input').keydown(function(event){
    if (event.keyCode == 13) {
        if ($('.search-input').val() == "") {
            return;
        } else {
            event.preventDefault();
            let searchValue = $('.search-input').val();
            searchByCityOrZip(searchValue);
        }
    }
})


$('.search-btn').click(function(event){
    if ($('.search-input').val() == "") {
        return;
    } else {
        event.preventDefault();
        let searchValue = $('.search-input').val();
        searchByCityOrZip(searchValue);
    };
})



// || MAIN DISPLAY WEATHER DATA TO THE SCREEN
function createSearchResults(weatherSearchResults){
    $('.description').text(weatherSearchResults.current.weather[0].description)
    $('.temperature').text(weatherSearchResults.current.temp)
    $('.wind-speed').text(weatherSearchResults.current.wind_speed)
    $('.humidity').text(weatherSearchResults.current.humidity);
}



// SET BACKGROUND DIV IMAGE TO CURRENT WEATHER FOR THAT CITY
// function changeBackground() {
//     const body = $('body')
//     const possibleBackgrounds = [
//     "./assets/images/clear-night-2-crop-blur.png", 
//     "./assets/images/clear-night-3-crop-blur.png",
//     "./assets/images/clear-night-4-crop-blur.png",
//     "./assets/images/clear-sunny-crop-blur.png",
//     "./assets/images/rainy-day-1-crop-blur.png",
//     "./assets/images/rainy-day-2-crop-blur.png",
//     "./assets/images/rainy-night-1-crop-blur.png",
//     "./assets/images/snowy-day-1-crop-blur.png",
//     "./assets/images/sunny-clear-1-crop-blur.png",
//     "./assets/images/sunny-cloudy-1-crop-blur.png",
//     "./assets/images/sunny-cloudy-3-crop-blur.png"
//     ]
    
//     let randomBackground = possibleBackgrounds[Math.floor(Math.random() * possibleBackgrounds.length)];
//     $(body).css('background-image', `url(${randomBackground})`)
    
// } changeBackground();