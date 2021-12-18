// API key 276a0385c550d64519820d182928a8c4
var input = document.querySelector("#city-input");
var searchBtn = document.querySelector("#search-form");
var currentContainer = document.querySelector("#current");
var forecastContainer = document.querySelector("#forecast");
var searchHistoryContainer = document.querySelector('#previous');
var searchHistory = [];

// function to take the user input(city entered) and create variable for it
function handleFormSubmit(event) {
  event.preventDefault();
  var city = input.value.trim();
  getCity(city);

  input.value = "";
}

// function to put city into the api and saves search to local storage
function getCity(city) {
  var url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=276a0385c550d64519820d182928a8c4`;

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      oneCall(data);
      saveSearchToLocaStorage(city);
    });
}

// takes latitude and longitude from previous search and puts it into the onecall api to grab the information needed
function oneCall(weatherData) {

  var cityName = weatherData.name;
  var lat = weatherData.coord.lat;
  var lon = weatherData.coord.lon;

  var url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=imperial&appid=276a0385c550d64519820d182928a8c4`;

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      currentWeather(data.current, cityName);
      forecastWeather(data.daily, cityName);
    });
}

// creates variables for the current weather forecast
function currentWeather(current, city) {
  console.log(current);
  var icon = current.weather[0].icon;
  var temp = current.temp;
  var wind = current.wind_speed;
  var humidity = current.humidity;
  var uv = current.uvi;

  currentContainer.innerHTML = "";

  //create the elements needed to display on the html
  var cardTitle = document.createElement("h3");
  var card = document.createElement("div");
  var cardHeader = document.createElement("div");
  var listGroup = document.createElement("ul");
  var tempEl = document.createElement("li");
  var windEl = document.createElement("li");
  var humidityEl = document.createElement("li");
  var uvEl = document.createElement("li");
  var iconEl = document.createElement("img");

  // add classes to the elements we just created
  card.setAttribute("class", "card");
  cardHeader.setAttribute("class", "card-header");

  // add text content to the elements we created
  cardTitle.textContent = "Current Weather";
  cardHeader.textContent = city + " - " + moment().format("MMMM Do YYYY");
  tempEl.textContent = "Temp: " + temp + "°F";
  windEl.textContent = "Wind: " + wind + " MPH";
  humidityEl.textContent = "Humidity: " + humidity + "%";
  uvEl.textContent = "UV Index: " + uv;

  // add image source for the weather icons
  iconEl.src = "http://openweathermap.org/img/w/" + icon + ".png";

  listGroup.append(tempEl, windEl, humidityEl, uvEl);
  card.append(cardHeader, listGroup);
  cardHeader.append(iconEl);
  currentContainer.append(cardTitle, card);
}

function forecastWeather(daily, city) {
  console.log(daily);
  forecastContainer.innerHTML = "";
  var cardTitle = document.createElement("h3");
  cardTitle.textContent = "5 Day Forecast";
  forecastContainer.append(cardTitle);

  // for loop to create cards and data for each day of the 5 day forecast
  for (let i = 1; i <= 5; i++) {
    var icon = daily[i].weather[0].icon;
    var temp = daily[i].temp.day;
    var wind = daily[i].wind_speed;
    var humidity = daily[i].humidity;
    var date = moment().add(i, "days").format("MM/D/YY");

    // create elements we need to display on forecast
    var cardContainer = document.createElement("div");
    var card = document.createElement("div");
    var cardHeader = document.createElement("div");
    var listGroup = document.createElement("ul");
    var tempEl = document.createElement("li");
    var windEl = document.createElement("li");
    var humidityEl = document.createElement("li");
    var iconEl = document.createElement("img");

    // add classes/styling to cards for forecast
    cardContainer.setAttribute("class", "col-md");
    card.setAttribute("class", " card ");
    cardHeader.setAttribute("class", "card-header");

    // add text content to each card using the elements we created
    cardHeader.textContent = date;
    tempEl.textContent = "Temp: " + temp + "°F";
    windEl.textContent = "Wind: " + wind + " MPH";
    humidityEl.textContent = "Humidity: " + humidity + "%";

    // add image source for the weather icons
    iconEl.src = "http://openweathermap.org/img/w/" + icon + ".png";
   
    // appended the elements so they appear on the site
    cardHeader.append(iconEl);
    listGroup.append(tempEl, windEl, humidityEl);
    card.append(cardHeader, listGroup);
    cardContainer.append(card);
    forecastContainer.append(cardContainer);
  }
}

// function to save each city you search to local storage
function saveSearchToLocaStorage(city){
  //to make sure city is not duplicated in local storage
if(searchHistory.indexOf(city)!== -1){
  return;
}

searchHistory.push(city);
localStorage.setItem('search', JSON.stringify(searchHistory));
createHistoryBtns()

}


function createHistoryBtns(){
  searchHistoryContainer.innerHTML = ""

  // loop to create button for each search item that goes into local storage
  for (var i = 0; i < searchHistory.length; i++) {
    
    var btn =  document.createElement('button');
    btn.setAttribute('type', 'button');
    btn.setAttribute('class', 'search-button mt-2')
    btn.setAttribute('city-name', searchHistory[i])

    btn.textContent = searchHistory[i]
    searchHistoryContainer.append(btn)
  }
}

// makes buttons appear on the side of the webpage
function loadBtns(){
  if(localStorage.getItem('search')){
    searchHistory = JSON.parse(localStorage.getItem('search'))
  }

  createHistoryBtns()
}

// makes buttons appear on the side of the webpage right when the webpage is opened
function historyBtnClick(event){
  var historyClick = event.target.getAttribute('city-name');
  getCity(historyClick)
}
loadBtns()

searchHistoryContainer.addEventListener('click', historyBtnClick)
searchBtn.addEventListener("submit", handleFormSubmit);
