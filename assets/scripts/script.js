// https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
// MY API KEY: a4b9474ba2b20171d99cdb82d09fd3b2

// US Country code is 840, or USA, or US
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}


// SET BODY BACKGROUND TO CHANGE
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

createPopularCitiesBtns = () => {
    const popularCitiesBtnContainer = $('.popular-cities-btn-container')
    const popularCities = [
    "Atlanta",
    "Boston",
    "Chicago",
    "Dallas",
    "Denver",
    "Los Angeles",
    "Miami",
    "New York",
    "Seattle",
    "Washington D.C.",
    ]
    for (i=0; i < popularCities.length; i++){
        let popularCitiesBtn = $('<button class="btn text-nowrap popular-city-btn" onclick="searchPopularCity()"></button>')
        $(popularCitiesBtn).text(popularCities[i]);
        popularCitiesBtnContainer.append(popularCitiesBtn)
    }
}

createPopularCitiesBtns();