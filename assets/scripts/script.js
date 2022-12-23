// || GLOBAL VARIABLES FOR API SEARCHES

// MY API KEY: a4b9474ba2b20171d99cdb82d09fd3b2
const apiKey = "&appid=a4b9474ba2b20171d99cdb82d09fd3b2"

// SEARCH FOR WEATHER
// https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&appid={API key}
const weatherApi = "https://api.openweathermap.org/data/3.0/onecall?"

// FIND LAT AND LON BY CITY NAME OR BY ZIPCODE
// US Country code is 840, or USA, or US
const countryCode = "840"
const apiLimit = "&limit=1"
// BY CITY NAME
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
const geoApiCity = "http://api.openweathermap.org/geo/1.0/direct?q="
// BY ZIP CODE
// http://api.openweathermap.org/geo/1.0/zip?zip={zip code},{country code}&appid={API key}
const geoApiZip = "http://api.openweathermap.org/geo/1.0/zip?zip="



// || DYNAMIC CREATION OF DOM ELEMENTS ON LOAD

// SET BODY BACKGROUND TO CHANGE ON RELOAD
function changeBackground() {
    const body = $('body')
    const possibleBackgrounds = [
    "./assets/images/clear-night-2-crop-blur.png", 
    "./assets/images/clear-night-3-crop-blur.png",
    "./assets/images/clear-night-4-crop-blur.png",
    "./assets/images/clear-sunny-crop-blur.png",
    "./assets/images/rainy-day-1-crop-blur.png",
    "./assets/images/rainy-day-2-crop-blur.png",
    "./assets/images/rainy-night-1-crop-blur.png",
    "./assets/images/snowy-day-1-crop-blur.png",
    "./assets/images/sunny-clear-1-crop-blur.png",
    "./assets/images/sunny-cloudy-1-crop-blur.png",
    "./assets/images/sunny-cloudy-3-crop-blur.png"
    ]
    
    let randomBackground = possibleBackgrounds[Math.floor(Math.random() * possibleBackgrounds.length)];
    $(body).css('background-image', `url(${randomBackground})`)
    
} changeBackground();

// CREATE POPULAR CITY SEARCH BUTTONS
createPopularCitiesBtns = () => {
    const popularCitiesBtnContainer = $('.popular-cities-btn-container')
    const popularCities = [
    {city: "Atlanta", stateCode: "US-GA"},
    {city: "Boston", stateCode: "US-MA"},
    {city: "Chicago", stateCode: "US-IL"},
    {city: "Dallas", stateCode: "US-TX"},
    {city: "Denver", stateCode: "US-CO"},
    {city: "Los Angeles", stateCode: "US-CA"},
    {city: "Miami", stateCode: "US-FL"},
    {city: "New York", stateCode: "US-NY"},
    {city: "Seattle", stateCode: "US-WA"},
    {city: "Washington D.C.", stateCode: "US-DC"},
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
function fetchCoordinatesByCity (cityName, stateCode) {
    return fetch(`${geoApiCity}${cityName},${stateCode},${countryCode}${apiLimit}${apiKey}`)
        .then((data) => data.json())
        .then(function (results) {
            let searchCoordinates = [results[0].lat, results[0].lon];
            return searchCoordinates;
        });
}

// GET COORDINATES BY ZIP CODE
function fetchCoordinatesByZip (){

}

// GET WEATHER DATA USING COORDINATES
function searchWeatherByCoordinates (searchCoordinates) {
    return fetch (`${weatherApi}lat=${searchCoordinates[0]}&lon=${searchCoordinates[1]}${apiKey}`)
        .then((data) => data.json())
        .then(function (results){
            let weatherSearchResults = results
            console.log(weatherSearchResults);
            return weatherSearchResults;
        })
}



//  || MAIN SEARCH AND DISPLAY FUNCTIONS (ON CLICK OF POPULAR CITIES, or BY SEARCH BAR)

// DISPLAY WEATHER DATA TO THE SCREEN
function createWeatherDisplay(weatherSearchResults){

}

// HANDLE ON CLICK EVENT FOR POPULAR CITY BUTTONS (searchPopularCity is added in dynamically in the createPopularCitiesBtns function)
function searchPopularCity(event) {
    event.preventDefault();
    let selectedPopularCity = event.target
    let cityName = $(selectedPopularCity).text()
    let stateCode = $(selectedPopularCity).attr('data-state-code')
    fetchCoordinatesByCity(cityName, stateCode)
        .then((searchCoordinates) => searchWeatherByCoordinates(searchCoordinates)
        .then((weatherSearchResults) => createWeatherDisplay(weatherSearchResults)
        ));
}