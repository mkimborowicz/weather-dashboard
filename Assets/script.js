// API key 276a0385c550d64519820d182928a8c4
var input = document.querySelector("#city-input");
var searchBtn = document.querySelector("#search-button");

var city = input.value.trim();


function getCity(city){

var url = `https://api.openweathermap.org/data/2.5/weather?q=seattle&appid=276a0385c550d64519820d182928a8c4`

fetch(url)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data)

    })
}
    searchBtn.addEventListener("click", getCity)