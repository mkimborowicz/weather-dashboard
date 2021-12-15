// API key 276a0385c550d64519820d182928a8c4
var input = document.querySelector("#city-input");
var searchBtn = document.querySelector("#search-form");
var currentContainer = document.querySelector("#current");
var forecastContainer = document.querySelector("#forecast");

function handleFormSubmit(event) {
  event.preventDefault();
  var city = input.value.trim();
  getCity(city);

  input.value = "";
}

function getCity(city) {
  var url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=276a0385c550d64519820d182928a8c4`;

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      oneCall(data);
    });
}

function oneCall(weatherData) {
  // console.log(weatherData);

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

  card.setAttribute("class", "card");
  cardHeader.setAttribute("class", "card-header");

  cardTitle.textContent = "Current Weather";
  cardHeader.textContent = city + " - " + moment().format("MMMM Do YYYY");
  tempEl.textContent = "Temp: " + temp + "°F";
  windEl.textContent = "Wind Speed: " + wind + " MPH";
  humidityEl.textContent = "Humidity: " + humidity + "%";
  uvEl.textContent = "UV Index: " + uv;

  listGroup.append(tempEl, windEl, humidityEl, uvEl);
  card.append(cardHeader, listGroup);

  currentContainer.append(cardTitle, card);
}

function forecastWeather(daily, city) {
  console.log(daily);

  for (let i=0; i<6; i++) {
    var icon = daily[i].weather[0].icon;
    var temp = daily[i].temp.day;
    var wind = daily[i].wind_speed;
    var humidity = daily[i].humidity;
    var date = moment().add(1, "days").format("MM/D/YY");
    console.log(wind);
  
  var card = document.createElement("div");
  var cardHeader = document.createElement("div");
  var listGroup = document.createElement("ul");
  var tempEl = document.createElement("li");
  var windEl = document.createElement("li");
  var humidityEl = document.createElement("li");
  var iconEl = document.createElement("img");

  card.setAttribute("class", "card");
  cardHeader.setAttribute("class", "card-header");

  cardHeader.textContent = date;
  tempEl.textContent = "Temp: " + temp + "°F";
  windEl.textContent = "Wind Speed: " + wind + " MPH";
  humidityEl.textContent = "Humidity: " + humidity + "%";

  listGroup.append(tempEl, windEl, humidityEl);
  card.append(cardHeader, listGroup);
}
  var cardTitle = document.createElement("h3");
  cardTitle.textContent = "5 Day Forecast";
  currentContainer.append(cardTitle, card);
}

searchBtn.addEventListener("submit", handleFormSubmit);
